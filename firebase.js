// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABCgqDfJQQalln7ZIPZe9HVzAYetlJPGc",
  authDomain: "wordy-69e20.firebaseapp.com",
  projectId: "wordy-69e20",
  storageBucket: "wordy-69e20.appspot.com",
  messagingSenderId: "245984136254",
  appId: "1:245984136254:web:1955af0bd29b5749ed156f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);



export default app