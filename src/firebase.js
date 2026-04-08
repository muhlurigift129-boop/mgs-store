// Firebase core
import { initializeApp } from "firebase/app"

// 🔥 Add these (VERY IMPORTANT)
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Optional (safe analytics for production)
import { getAnalytics, isSupported } from "firebase/analytics"

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyDpLXAn7sYWfJWvsi0Rb-qcojZC3NgkjJQ",
  authDomain: "mgs-store-f3053.firebaseapp.com",
  projectId: "mgs-store-f3053",
  storageBucket: "mgs-store-f3053.firebasestorage.app",
  messagingSenderId: "581808688902",
  appId: "1:581808688902:web:dfee492eca9f1ef499d887",
  measurementId: "G-XJZSHWJK2Y"
}

// Initialize app
const app = initializeApp(firebaseConfig)

// ✅ FIRESTORE (orders, products, tracking)
export const db = getFirestore(app)

// ✅ AUTH (login/register)
export const auth = getAuth(app)

// ✅ SAFE ANALYTICS (won’t crash on Render)
export let analytics = null

isSupported().then((yes)=>{
  if(yes){
    analytics = getAnalytics(app)
  }
})

export default app