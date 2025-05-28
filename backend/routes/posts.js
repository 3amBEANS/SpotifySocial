const express = require("express");
const router = express.Router();
const db = require("../firebase");

// GET /api/posts/public
router.get("/public", async (req, res) => {
  try {
    const snapshot = await db
      .collection("posts")
      .get();

    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ POST /api/users/seed
router.post("/seed", async (req, res) => {
  try {

    
    res.status(200).send("Mock users added");
  } catch (err) {
    console.error("Seeding error:", err);
    res.status(500).send("Seeding failed");
  }
});

module.exports = router;


