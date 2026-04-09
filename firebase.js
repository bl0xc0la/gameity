// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your config (kept the same)
const firebaseConfig = {
  apiKey: "AIzaSyAW1rG5UOdmsI3aSGhmSvVtH7TEZlFsK_U",
  authDomain: "watchify-4f64d.firebaseapp.com",
  databaseURL: "https://watchify-4f64d-default-rtdb.firebaseio.com",
  projectId: "watchify-4f64d",
  storageBucket: "watchify-4f64d.firebasestorage.app",
  messagingSenderId: "201200324089",
  appId: "1:201200324089:web:94386fbc088420e5c80128",
  measurementId: "G-FBZQZGW8KR"
};

// Init
const app = initializeApp(firebaseConfig);

// Services you ACTUALLY need
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
