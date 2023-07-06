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
        uid: user.uid,
        username: username,
        email: email,
        wordsGuessed: [],
        score: 0,
        highestScore: 0,
        overallScore: 0,
      };
      await user.updateProfile({ displayName: username });
      console.log("Before set");
      await userRef.set(userData);
      console.log("After set");
      console.log(user);
      return { uid: user.uid, ...userData };
    } catch (error) {
      // adding error about email address that is not valid or exsits, also userName.
      throw new Error("Failed to sign up: " + error.message);
    }
  };
  
  const updateUserData = async (
    newUsername,
    newScore,
    newAttempts,
    newGuessIt,
    newWord,
    newWordsGuessed
  ) => {
    if (!currentUser) {
      throw new Error("No user is currently logged in");
    }
  
    try {
      const userRef = firestore.collection("users").doc(currentUser.uid);
      const doc = await userRef.get();
      if (doc.exists) {
        const userData = doc.data();
        const prevUser = { ...userData };
  
        const updatedUserData = {
          username: newUsername || "",
          score: newScore !== undefined ? newScore : 0,
          attempts: newAttempts !== undefined ? newAttempts : 0,
          guessit: newGuessIt !== undefined ? newGuessIt : false,
          wordsGuessed: newWordsGuessed || [], // Add the newWordsGuessed array to the updated user data
        };
  
        await userRef.update(updatedUserData);
  
        if (newScore > prevUser.highestScore) {
          await userRef.update({ highestScore: newScore });
        }
  
        const overallScore =
          updatedUserData.wordsGuessed.length * 2 - updatedUserData.attempts;
        await userRef.update({ overallScore });
  
        setCurrentUser((prevUser) => ({
          ...prevUser,
          ...updatedUserData,
          overallScore,
        }));
      } else {
        const userData = {
          username: newUsername || "",
          score: newScore !== undefined ? newScore : 0,
          attempts: newAttempts !== undefined ? newAttempts : 0,
          guessit: newGuessIt !== undefined ? newGuessIt : false,
          highestScore: newScore !== undefined ? newScore : 0,
          overallScore: 0,
          wordsGuessed: newWordsGuessed || [], // Add the newWordsGuessed array to the user data
        };
  
        await userRef.set(userData);
  
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

