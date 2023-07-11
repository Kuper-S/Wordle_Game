import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../services/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import {calculateOverallScore} from "../Hooks/useScores";

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
        wordsGuessed: [],
        overallScore: 0,
      };
      await user.updateProfile({ displayName: username });
      
      await userRef.set(userData);
      
      console.log(user);
      return { uid: user.uid, ...userData };
    } catch (error) {
      // adding error about email address that is not valid or exsits, also userName.
      throw new Error("Failed to sign up: " + error.message);
    }
  };

  const updateUserData = async (newWordsGuessed, newAttempts) => {
    if (!currentUser) {
      throw new Error("No user is currently logged in");
    }
  
    try {
      const userRef = firestore.collection("users").doc(currentUser.uid);
      const doc = await userRef.get();
      if (doc.exists) {
        const userData = doc.data();
  
        const currentOverallScore = userData?.overallScore || 0;
        const latestGameScore = calculateOverallScore(userData, newAttempts);
  
        if (latestGameScore > currentOverallScore) {
          const updatedUserData = {
            ...userData,
            wordsGuessed: newWordsGuessed || userData.wordsGuessed || [],
            overallScore: latestGameScore,
          };
  
          await userRef.update(updatedUserData);
          setCurrentUser(updatedUserData);
        } else {
          setCurrentUser(userData);
        }
      } else {
        throw new Error("User document does not exist");
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
    ...(setCurrentUser && { setCurrentUser }),
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
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

