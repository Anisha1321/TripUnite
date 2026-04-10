// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXwyVlTqkeUTeRNGPPW4kUu9DohOcbB1M",
  authDomain: "tripunite.firebaseapp.com",
  projectId: "tripunite",
  storageBucket: "tripunite.firebasestorage.app",
  messagingSenderId: "185470935581",
  appId: "1:185470935581:web:b088b5762b486cc9271cf4",
  measurementId: "G-2FFV12JTNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);