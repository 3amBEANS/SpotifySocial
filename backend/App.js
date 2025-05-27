const express = require("express");
const https = require("https");
const fs = require("fs");
const admin = require("firebase-admin");
const serviceAccount = require("./permissions.json");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setting up Firebase-admin privileges:
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
module.exports = db;

// Mount routes
const loginRouter = require("./Login");
app.use("/login", loginRouter);

const logoutRouter = require("./Logout");
+app.use("/logout", logoutRouter);

const options = {
  key: fs.readFileSync("test-spotify-site.local-key.pem"),
  cert: fs.readFileSync("test-spotify-site.local.pem"),
};

//Hosting the backend on port 5000
https.createServer(options, app).listen(port, () => {
  console.log(`HTTPS Server is running on https://test-spotify-site.local:${port}`);
});
