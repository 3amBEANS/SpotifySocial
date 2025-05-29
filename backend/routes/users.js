const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();
const db = admin.firestore();

// GET /api/users/public
router.get("/public", async (req, res) => {
  try {
    const snapshot = await db.collection("users").where("isPublic", "==", true).get();

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /api/users/:id/top
router.get("/:id/top", async (req, res) => {
  try {
    const userDoc = await db.collection("users").doc(req.params.id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const { accessToken } = userDoc.data();
    if (!accessToken) {
      return res.status(400).json({ error: "No Spotify token available" });
    }

    // define headers for Spotify calls
    const headers = { Authorization: `Bearer ${accessToken}` };

    const [artistsRes, tracksRes, likedRes] = await Promise.all([
      fetch("https://api.spotify.com/v1/me/top/artists?limit=4", { headers }),
      fetch("https://api.spotify.com/v1/me/top/tracks?limit=4", { headers }),
      fetch("https://api.spotify.com/v1/me/tracks?limit=4", { headers }),
    ]);

    // check for any upstream errors
    if (!artistsRes.ok || !tracksRes.ok || !likedRes.ok) {
      console.error(
        "Spotify API error:",
        artistsRes.status,
        await artistsRes.text(),
        tracksRes.status,
        await tracksRes.text(),
        likedRes.status,
        await likedRes.text()
      );
      return res.status(502).json({ error: "Spotify upstream error" });
    }

    // pull out the JSON
    const artistsData = await artistsRes.json();
    const tracksData = await tracksRes.json();
    const likedData = await likedRes.json();

    return res.json({
      topArtists: artistsData.items,
      topSongs: tracksData.items,
      likedSongs: likedData.items.map((item) => item.track),
    });
  } catch (err) {
    console.error("Error fetching top data:", err);
    return res.status(500).json({ error: "Could not fetch top data" });
  }
});

// GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const doc = await db.collection("users").doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/users/:id/setup
router.post("/:id/setup", async (req, res) => {
  try {
    const { username, createdAt, avatarUrl, displayName, location } = req.body;
    const formatted = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    await db.collection("users").doc(req.params.id).set(
      {
        username,
        createdAt: formatted,
        avatarUrl,
        displayName,
        location,
        isPublic: true,
        bio: "",
        tags: [],
        isProfileSetup: true, // now mark setup complete
      },
      { merge: true }
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Setup error:", err);
    return res.status(500).json({ error: "Setup failed" });
  }
});

// ✅ POST /api/users/seed
router.post("/seed", async (req, res) => {
  try {
    const mockUsers = [
      {
        name: "Jane Doe",
        bio: "Loves discovering chill beats",
        avatar: "https://i.pravatar.cc/150?img=5",
        role: "Listener",
        isPublic: true,
        tags: ["Music Lover", "Top Listener"],
      },
      {
        name: "Sam Smith",
        bio: "Into indie and lo-fi",
        avatar: "https://i.pravatar.cc/150?img=15",
        role: "Listener",
        isPublic: true,
        tags: ["Indie Head"],
      },
    ];

    const batch = db.batch();
    mockUsers.forEach((user) => {
      const docRef = db.collection("users").doc(); // auto-ID
      batch.set(docRef, user);
    });

    await batch.commit();
    res.status(200).send("Mock users added");
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
