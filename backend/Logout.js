const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // Clear the OAuth state cookie
  res.clearCookie("spotify_auth_state");
  res.clearCookie("spotify_token");
  res.redirect("http://localhost:5173/");
});

module.exports = router;
