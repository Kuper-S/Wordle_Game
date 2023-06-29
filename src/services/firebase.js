import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore";
import 'firebase/compat/storage';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDpIsXIFQNhkJ6O7rkz0eURYv9IJL3C9iU",
  authDomain: "wordle-game-superkuper.firebaseapp.com",
  projectId: "wordle-game-superkuper",
  storageBucket: "wordle-game-superkuper.appspot.com",
  messagingSenderId: "959762425502",
  appId: "1:959762425502:web:ae8fded2779d79d86b3d8f",
  measurementId: "G-MB0Q207D79"
})

export const auth = app.auth()
export const firestore = app.firestore(); 
export const db = firestore; 

export default app
