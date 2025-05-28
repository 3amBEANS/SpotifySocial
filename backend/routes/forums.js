const express = require("express");
const router = express.Router();
const db = require("../firebase");
const admin = require('firebase-admin');

// GET /api/forums/public
//get all the forums:
router.get("/public", async (req, res) => {
  try {
    
        const snapshot = await db
        .collection("forums")
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

// ✅ POST /api/forums/seed
router.post("/seed", async (req, res) => {
  try {
    const docRef = await db.collection("forums").add(req.body);
    const savedPost = { id: docRef.id, ...req.body };
     res.status(200).json(savedPost);
  } catch (err) {
    console.error("Seeding error:", err);
    res.status(500).send("Seeding failed");
  }
});


module.exports = router;
