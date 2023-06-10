// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpIsXIFQNhkJ6O7rkz0eURYv9IJL3C9iU",
  authDomain: "wordle-game-superkuper.firebaseapp.com",
  projectId: "wordle-game-superkuper",
  storageBucket: "wordle-game-superkuper.appspot.com",
  messagingSenderId: "959762425502",
  appId: "1:959762425502:web:ae8fded2779d79d86b3d8f",
  measurementId: "G-MB0Q207D79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export default db;