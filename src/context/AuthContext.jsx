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
        email: email,
        wordsGuessed: [],
        score: 0,
        highestScore: 0,
      };
      await user.updateProfile({ displayName: username });
      console.log("Before set");
      await userRef.set(userData);
      console.log("After set");
      console.log(user);
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
        const userData = doc.data();
        const prevUser = { ...userData };
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
  
        // Check and update the highest score
        if (newScore > prevUser.highestScore) {
          await userRef.update({ highestScore: newScore });
        }
      } else {
        // Create a new user document
        const userData = {
          username: newUsername || "", // Use empty string as default value if newUsername is undefined
          score: newScore !== undefined ? newScore : 0,
          attempts: newAttempts !== undefined ? newAttempts : 0, // Set 0 as default value if newAttempts is undefined
          guessit: newGuessIt !== undefined ? newGuessIt : false, // Set false as default value if newGuessIt is undefined
          highestScore: newScore !== undefined ? newScore : 0, // Set initial highest score as the new score
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


// const updateUserData = async (newUsername, newAttempts, newGuessIt) => {
  //   if (!currentUser) {
  //     throw new Error("No user is currently logged in");
  //   }
  
  //   try {
  //     const userRef = firestore.collection("users").doc(currentUser.uid);
  //     const doc = await userRef.get();
  //     if (doc.exists) {
  //       const userData = doc.data();
  //       const updatedWordsGuessed = [...userData.wordsGuessed];
  
  //       // Add new word and attempts to wordsGuessed array
  //       if (newAttempts !== undefined && newGuessIt !== undefined) {
  //         const newWordGuessed = {
  //           word: newUsername,
  //           attempts: newAttempts,
  //         };
  //         updatedWordsGuessed.push(newWordGuessed);
  //       }
  
  //       const numWordsGuessed = updatedWordsGuessed.length;
  //       const totalAttempts = updatedWordsGuessed.reduce((total, word) => total + word.attempts, 0);
  //       const score = numWordsGuessed + totalAttempts;
  //       const highestScore = Math.max(score, userData.highestScore || 0); // Compare current score with existing highest score
  
  //       const updatedUserData = {
  //         name: newUsername || userData.name,
  //         wordsGuessed: updatedWordsGuessed,
  //         score: score,
  //         highestScore: highestScore,
  //       };
  
  //       await userRef.update(updatedUserData);
  
  //       setCurrentUser((prevUser) => ({
  //         ...prevUser,
  //         ...updatedUserData,
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("Error updating user data:", error);
  //     throw new Error("Failed to update user data: " + error.message);
  //   }
  // };