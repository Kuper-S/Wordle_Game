import { collection, addDoc, where, query, getDocs ,getFirestore} from "firebase/firestore";
import { auth ,firestore,db} from "./firebase_test";
import firebase from "firebase/compat/app";




export const signInWithGoogle = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
    // You can access the user data with `auth.currentUser`
    // Example: const user = auth.currentUser;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to sign in with Google");
  }
};

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    // You can access the user data with `auth.currentUser`
    // Example: const user = auth.currentUser;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to sign in with email and password");
  }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const db = getFirestore();
  
      // You can access the created user data with `user`
      // Example: const userId = user.uid;
      // Add user to Firestore collection
      const usersRef = collection(db, "users");
      await addDoc(usersRef, {
        uid: user.uid,
        name: name,
        email: email,
        authProvider: "local",
      });
    } catch (err) {
      console.error(err);
      throw new Error("Failed to register with email and password");
    }
  };

export const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    console.log("Password reset email sent!");
  } catch (err) {
    console.error(err);
    throw new Error("Failed to send password reset email");
  }
};

export const logout = () => {
  auth.signOut();
};