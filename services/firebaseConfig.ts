import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBzruvyswYuq-74FKEHHPlgWOD9U64YdVY",
  authDomain: "gardening-app-9dbfa.firebaseapp.com",
  projectId: "gardening-app-9dbfa",
  storageBucket: "gardening-app-9dbfa.firebasestorage.app",
  messagingSenderId: "947256632811",
  appId: "1:947256632811:web:ac38ef0d2fa0190d7ea5ae"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);