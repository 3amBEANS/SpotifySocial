const express = require("express");
const router = express.Router();
const db = require("../firebase");

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
    console.error("Seeding error:", err);
    res.status(500).send("Seeding failed");
  }
});



module.exports = router;
