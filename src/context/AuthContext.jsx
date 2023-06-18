import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../services/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, username) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      const userRef = firestore.collection("users").doc(user.uid);
      await userRef.set({
        email,
        username,
        score: 0,
      });
      
      return user;
    } catch (error) {
      throw new Error("Failed to sign up: " + error.message);
    }
  };
  
  const updateUserData = async (newUsername, score) => {
    if (!currentUser) {
      throw new Error("No user is currently logged in");
    }
  
    // Check if the user document exists
    const userRef = firestore.collection("users").doc(currentUser.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      throw new Error("User document does not exist");
    }
  
    // Update the user data in the Firestore database
    try {
      await userRef.update({
        username: newUsername,
        score: score,
      });
  
      // Optionally, you can update the currentUser state with the new username and score as well
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username: newUsername,
        score: score,
      }));
    } catch (error) {
      console.error("Error updating user data:", error);
      throw new Error("Failed to update user data: " + error.message);
    }
  };
  
  

  const logIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logOut = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  };

  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
    return auth.signInWithPopup(provider);
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    logOut,
    logIn,
    resetPassword,
    signInWithGoogle,
    signInWithGithub,
    updateEmail,
    updatePassword,
    updateUserData, 
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
