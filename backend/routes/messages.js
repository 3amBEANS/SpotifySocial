const express = require("express");
const router = express.Router();
const db = require("../firebase"); // initialized Firestore

// POST /api/messages/send
router.post("/send", async (req, res) => {
  const { from, to, text } = req.body;

  if (!from || !to || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await db.collection("messages").add({
      from,
      to,
      text,
      timestamp: new Date(),
    });

    res.status(200).json({ message: "Message sent!" });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;
