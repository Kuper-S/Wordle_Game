import firebase from "firebase/compat/app";
import { getFirestore} from "firebase/firestore"
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDpIsXIFQNhkJ6O7rkz0eURYv9IJL3C9iU",
    authDomain: "wordle-game-superkuper.firebaseapp.com",
    projectId: "wordle-game-superkuper",
    storageBucket: "wordle-game-superkuper.appspot.com",
    messagingSenderId: "959762425502",
    appId: "1:959762425502:web:ae8fded2779d79d86b3d8f",
    measurementId: "G-MB0Q207D79"
  };

firebase.initializeApp(firebaseConfig);
export const db = getFirestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = firebase.auth();
export default firebase;
