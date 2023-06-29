import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../services/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, username) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      const userRef = firestore.collection("users").doc(user.uid);
      const userData = {
        email,
        username,
        score: 0,
        attempts: 0,
        guessit: false,
      };

      await user.updateProfile({ displayName: username });
      await userRef.set(userData);

      return { uid: user.uid, ...userData };
    } catch (error) {
      throw new Error("Failed to sign up: " + error.message);
    }
  };

  const updateUserData = async (newUsername, newScore, newAttempts, newGuessIt) => {
    if (!currentUser) {
      throw new Error("No user is currently logged in");
    }

    try {
      // Check if the user document exists
      const userRef = firestore.collection("users").doc(currentUser.uid);
      const doc = await userRef.get();
      if (doc.exists) {
        // Create an object to hold the updated user data
        const updatedUserData = {
          username: newUsername || "", // Use empty string as default value if newUsername is undefined
          score: newScore !== undefined ? newScore : 0,
          attempts: newAttempts !== undefined ? newAttempts : 0, // Set 0 as default value if newAttempts is undefined
          guessit: newGuessIt !== undefined ? newGuessIt : false, // Set false as default value if newGuessIt is undefined
        };

        // Update the user data in the Firestore database
        await userRef.update(updatedUserData);

        // Update the currentUser state with the new values
        setCurrentUser((prevUser) => ({
          ...prevUser,
          ...updatedUserData,
        }));
      } else {
        // Create a new user document
        const userData = {
          username: newUsername || "", // Use empty string as default value if newUsername is undefined
          score: newScore !== undefined ? newScore : 0,
          attempts: newAttempts !== undefined ? newAttempts : 0, // Set 0 as default value if newAttempts is undefined
          guessit: newGuessIt !== undefined ? newGuessIt : false, // Set false as default value if newGuessIt is undefined
        };

        await userRef.set(userData);

        // Update the currentUser state with the new values
        setCurrentUser((prevUser) => ({
          ...prevUser,
          ...userData,
        }));
      }
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

  const updateEmail = async (email) => {
    try {
      await currentUser.updateEmail(email);
    } catch (error) {
      console.error("Error updating email:", error);
      throw new Error("Failed to update email: " + error.message);
    }
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
    <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
  );
}

export default AuthProvider;
