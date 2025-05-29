// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhU2h9kWQnjhxFYJgHusWwNRAms_S03DM",
  authDomain: "spotifysocial-92ec4.firebaseapp.com",
  projectId: "spotifysocial-92ec4",
  storageBucket: "spotifysocial-92ec4.firebasestorage.app",
  messagingSenderId: "628170083975",
  appId: "1:628170083975:web:a01a246c93adb631753222",
  measurementId: "G-X0PCZ9CNYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only keep one import + usage of getAnalytics
const analytics = getAnalytics(app);

// Setup Firestore
const db = getFirestore(app);

// Export the Firestore db
export { db };
