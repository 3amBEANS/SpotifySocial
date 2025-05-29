const express = require("express");
const router = express.Router();
const db = require("../firebase");

// POST /api/messages/send
router.post("/send", async (req, res) => {
  const { from, to, message } = req.body;

  if (!from || !to || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const messageData = {
      from,
      to,
      message,
      participants: [from, to],
      timestamp: new Date(),
    };

    await db.collection("messages").add(messageData);
    console.log("Message being added:", messageData); // ✅ now logs correctly

    res.status(200).json({ message: "Message sent!" });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("messages").orderBy("timestamp", "desc").get();
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;




