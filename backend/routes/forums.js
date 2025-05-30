const express = require("express");
const router = express.Router();
const db = require("../firebase");
const admin = require('firebase-admin');
const { FieldValue } = require('firebase-admin/firestore');

// GET https://test-spotify-site.local:5050/api/forums/public
//get all the forums:
router.get("/public", async (req, res) => {
  try {
    
        const snapshot = await db
        .collection("forums")
        .orderBy("lastActivity", "desc")
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

router.get("/public/:forumId", async (req, res) => {
  try {
    const forumId = req.params.forumId;
    
    if (!forumId) {
      return res.status(400).json({ error: "Forum ID required" });
    }

    const forumRef = db.collection("forums").doc(forumId);
    const doc = await forumRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Forum not found" });
    }

    // Extract only the needed fields
    const { name, description, memberCount, postCount } = doc.data();
    
    res.status(200).json({
      id: doc.id,
      name,
      description,
      memberCount,
      postCount
    });

  } catch (err) {
    console.error("Error fetching forum:", err);
    res.status(500).json({ error: "Failed to fetch forum" });
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



router.patch("/:forumId", async (req, res) => {
  try {
    const forumId = req.params.forumId;
    const { userId, postId, postPreview } = req.body;

    // Validate IDs
    if (!forumId) return res.status(400).json({ error: "Forum ID required" });
    if (!userId) return res.status(400).json({ error: "User ID required" });
    if (!postId) return res.status(400).json({ error: "Post ID required" });

    const forumRef = db.collection("forums").doc(forumId);
    
    await db.runTransaction(async (transaction) => {
      const forumDoc = await transaction.get(forumRef);
      if (!forumDoc.exists) throw new Error("Forum not found");

      const forumData = forumDoc.data();
      const currentMembers = forumData.members || [];
      const isMember = currentMembers.includes(userId);

      // Prepare base updates
      const updates = {
        postCount: FieldValue.increment(1),
        lastActivity: Date.now() // Use number instead of string
      };

      // Add member if new user
      if (!isMember) {
        updates.memberCount = FieldValue.increment(1);
        updates.members = FieldValue.arrayUnion(userId);
      }

      // Update recentPosts with postPreview (using number timestamp)
      const recentPosts = forumData.recentPosts || [];
      const updatedRecentPosts = [
        {
          id: postId,
          ...postPreview,
          timestamp: Date.now()
        },
        ...recentPosts
      ].slice(0, 2);  // Hard limit to 2 posts
      updates.recentPosts = updatedRecentPosts; 

      transaction.update(forumRef, updates);
    });

    // Return updated document
    const updatedDoc = await forumRef.get();
    const updatedData = updatedDoc.data();
    
    // Convert to proper frontend format
    const updatedForum = {
      id: updatedDoc.id,
      ...updatedData,
      lastActivity: updatedData.lastActivity // Already a number
    };

    res.status(200).json(updatedForum);
  } catch (err) {
    console.error("Forum update error:", err);
    if (err.message === "Forum not found") {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Failed to update forum", details: err.message });
    }
  }
});

module.exports = router;
