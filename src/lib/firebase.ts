// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ6tNLbY4b_TL4C7OIXqUiW85VqZANMZw",
  authDomain: "optistock-ai-94a28.firebaseapp.com",
  projectId: "optistock-ai-94a28",
  storageBucket: "optistock-ai-94a28.firebasestorage.app",
  messagingSenderId: "1060875187583",
  appId: "1:1060875187583:web:421237f1a749f03612564a",
  measurementId: "G-1BG2PC6BVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
