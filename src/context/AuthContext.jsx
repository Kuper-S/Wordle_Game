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
        name: username,
        wordsGuessed: [],
        score: 0,
        highestScore: 0,
      };
      await user.updateProfile({ displayName: username });
      await userRef.set(userData);
  
      return { uid: user.uid, ...userData };
    } catch (error) {
      throw new Error("Failed to sign up: " + error.message);
    }
  };
  
  const updateUserData = async (newUsername, newAttempts, newGuessIt) => {
    if (!currentUser) {
      throw new Error("No user is currently logged in");
    }
  
    try {
      const userRef = firestore.collection("users").doc(currentUser.uid);
      const doc = await userRef.get();
      if (doc.exists) {
        const userData = doc.data();
        const updatedWordsGuessed = [...userData.wordsGuessed];
  
        // Add new word and attempts to wordsGuessed array
        if (newAttempts !== undefined && newGuessIt !== undefined) {
          const newWordGuessed = {
            word: newUsername,
            attempts: newAttempts,
          };
          updatedWordsGuessed.push(newWordGuessed);
        }
  
        const numWordsGuessed = updatedWordsGuessed.length;
        const totalAttempts = updatedWordsGuessed.reduce((total, word) => total + word.attempts, 0);
        const score = numWordsGuessed + totalAttempts;
        const highestScore = Math.max(score, userData.highestScore || 0); // Compare current score with existing highest score
  
        const updatedUserData = {
          name: newUsername || userData.name,
          wordsGuessed: updatedWordsGuessed,
          score: score,
          highestScore: highestScore,
        };
  
        await userRef.update(updatedUserData);
  
        setCurrentUser((prevUser) => ({
          ...prevUser,
          ...updatedUserData,
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
