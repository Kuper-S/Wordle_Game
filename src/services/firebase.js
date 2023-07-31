import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore";
import 'firebase/compat/storage';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "wordle-game-superkuper",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
})

export const auth = app.auth()
export const firestore = app.firestore(); 
export const db = firestore; 
export const storage = app.storage();

export default app;






