const express=require('express');
const admin = require("firebase-admin");
const serviceAccount = require("./permissions.json");
const app = express();
const cors = require("cors");
const port=5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Setting up Firebase-admin privileges:
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

//Hosting the backend on port 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


