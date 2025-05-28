const express = require("express");
const router = express.Router();
const db = require("../firebase");

// GET /api/posts/public
//ONLY GET the forum posts from a  PARTICULAR FORUM ID
router.get("/public", async (req, res) => {
  try {
        const forumID = req.query.forumID;
        if (!forumID) {
        return res.status(400).json({ error: "forumID is required" });
        }
        const snapshot = await db
        .collection("posts")
        .where("forumID", "==", forumID)
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

// ✅ POST /api/posts/seed
router.post("/seed", async (req, res) => {
  try {
    const docRef = await db.collection("posts").add(req.body);
    const savedPost = { id: docRef.id, ...req.body };
     res.status(200).json(savedPost);
  } catch (err) {
    console.error("Seeding error:", err);
    res.status(500).send("Seeding failed");
  }
});

module.exports = router;


