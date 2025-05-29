const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();
const db = admin.firestore();

router.post("/register", async (req, res) => {
  const { id, display_name, avatar_url, country } = req.body;

  try {
    const userRef = db.collection("users").doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      await userRef.set({
        name: display_name || "New User", // sets name on first create
        display_name: display_name || "New User",
        avatar_url: avatar_url || "",
        country: country || "US",
        isPublic: true,
        bio: "",
        tags: [],
        role: "Listener",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      // Make sure to update name if missing
      const existingData = doc.data();
      await userRef.update({
        name: existingData.name || display_name || "New User",
        display_name: existingData.display_name || display_name,
        avatar_url: existingData.avatar_url || avatar_url,
        country: existingData.country || country,
        isPublic: typeof existingData.isPublic === "boolean" ? existingData.isPublic : true,
        bio: existingData.bio || "",
        tags: Array.isArray(existingData.tags) ? existingData.tags : [],
        role: existingData.role || "Listener",
      });
    }

    res.status(200).json({ message: "User synced to Firestore" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

router.get("/public", async (req, res) => {
  try {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("isPublic", "==", true).get();

    const users = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
