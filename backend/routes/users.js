const express = require("express");
const router = express.Router();
const db = require("../firebase");
const fetch = require("node-fetch");
const axios = require("axios");

// ✅ GET /api/users/public – returns only public users with all their data
router.get("/public", async (req, res) => {
  try {
    const snapshot = await db.collection("users").where("isPublic", "==", true).get();
    const users = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/spotify/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Missing refresh token" });
  }

  const authHeader = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const newAccessToken = response.data.access_token;

    // Optional: Store the new access token in Firestore if you want
    // Example: req.body.userId must be passed to this endpoint if storing
    if (req.body.userId) {
      await db.collection("users").doc(req.body.userId).update({
        accessToken: newAccessToken,
      });
    }

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing Spotify token:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to refresh token" });
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

    const headers = { Authorization: `Bearer ${accessToken}` };

    const [artistsRes, tracksRes, likedRes] = await Promise.all([
      fetch("https://api.spotify.com/v1/me/top/artists?limit=4", { headers }),
      fetch("https://api.spotify.com/v1/me/top/tracks?limit=4", { headers }),
      fetch("https://api.spotify.com/v1/me/tracks?limit=4", { headers }),
    ]);

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
    const { username, createdAt, avatar_url, display_name, location } = req.body;
    const formatted = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    await db.collection("users").doc(req.params.id).set(
      {
        username,
        createdAt: formatted,
        avatar_url: avatar_url,
        display_name,
        location,
        isPublic: true,
        bio: "",
        tags: [],
        isProfileSetup: true,
        showLikedSongs: true,
        showTopArtists: true,
        showTopSongs: true,
      },
      { merge: true }
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Setup error:", err);
    return res.status(500).json({ error: "Setup failed" });
  }
});

// ✅ POST /api/users/seed – Add mock users
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
    console.error("Seeding error:", err);
    res.status(500).send("Seeding failed");
    console.error("Error seeding users:", err);
    res.status(500).json({ error: "Failed to seed users" });
  }
});

router.patch("/:id", async (req, res) => {
  const { isPublic, display_name, bio, avatar_url, showTopArtists, showTopSongs, showLikedSongs } =
    req.body;
  const userRef = db.collection("users").doc(req.params.id);

  // Only include fields your client actually sent
  const updateFields = {};
  if (isPublic !== undefined) updateFields.isPublic = isPublic;
  if (display_name !== undefined) updateFields.display_name = display_name;
  if (bio !== undefined) updateFields.bio = bio;
  if (avatar_url !== undefined) updateFields.avatar_url = avatar_url;
  if (showTopArtists !== undefined) updateFields.showTopArtists = showTopArtists;
  if (showTopSongs !== undefined) updateFields.showTopSongs = showTopSongs;
  if (showLikedSongs !== undefined) updateFields.showLikedSongs = showLikedSongs;

  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ error: "Nothing to update" });
  }

  try {
    await userRef.update(updateFields);
    const updated = await userRef.get();
    return res.json(updated.data());
  } catch (err) {
    console.error("User update failed", err);
    return res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;
