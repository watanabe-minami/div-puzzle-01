import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase の設定
const firebaseConfig = {
  apiKey: "AIzaSyBMEUBR-H0kp3T-87jmMbHpxuu_L7mGsSc",
  authDomain: "yuya-fujimoto-react9.firebaseapp.com",
  projectId: "yuya-fujimoto-react9",
  storageBucket: "yuya-fujimoto-react9.firebasestorage.app",
  messagingSenderId: "291530354327",
  appId: "1:291530354327:web:dc04eb92491ff8f300c3d2",
  measurementId: "G-G1L2SL1T1X"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
