// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpLXAn7sYWfJWvsi0Rb-qcojZC3NgkjJQ",
  authDomain: "mgs-store-f3053.firebaseapp.com",
  projectId: "mgs-store-f3053",
  storageBucket: "mgs-store-f3053.firebasestorage.app",
  messagingSenderId: "581808688902",
  appId: "1:581808688902:web:dfee492eca9f1ef499d887",
  measurementId: "G-XJZSHWJK2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);