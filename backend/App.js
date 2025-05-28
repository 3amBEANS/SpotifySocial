const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
const cors = require("cors");
const port = 5050;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setting up Firebase-admin privileges:
const db = require("./firebase");
module.exports = db;

// Mount routes
const loginRouter = require("./Login");
app.use("/login", loginRouter);

const logoutRouter = require("./Logout");
+app.use("/logout", logoutRouter);

//for discover page
const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);

//for messages
const messageRouter = require("./routes/messages");
app.use("/api/messages", messageRouter);

//for posts page
const postsRouter = require("./routes/posts");
app.use("/api/posts", postsRouter);

const options = {
  key: fs.readFileSync("test-spotify-site.local-key.pem"),
  cert: fs.readFileSync("test-spotify-site.local.pem"),
};

//Hosting the backend on port 5050
https.createServer(options, app).listen(port, () => {
  console.log(`HTTPS Server is running on https://test-spotify-site.local:${port}`);
});
