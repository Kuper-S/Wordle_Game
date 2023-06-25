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
  const [scores, setScores] = useState([]);
  const [scoreLoading, setScoreLoading] = useState(false);
  const [scoreError, setScoreError] = useState("");

  const signup = async (email, password, username) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      const userRef = firestore.collection("users").doc(user.uid);
      await userRef.set({
        email,
        username,
        score: 0,
      });

      // Retrieve the user document again to get the updated user object with uid
      const doc = await userRef.get();
      if (doc.exists) {
        const userData = doc.data();
        return { uid: user.uid, ...userData };
      }
    } catch (error) {
      throw new Error("Failed to sign up: " + error.message);
    }
  };

  const updateUserData = async (newUsername, newScore) => {
    if (!currentUser) {
      throw new Error("No user is currently logged in");
    }
  
    try {
      // Check if the user document exists
      const userRef = firestore.collection("users").doc(currentUser.uid);
      const doc = await userRef.get();
      if (doc.exists) {
        // Update the user data in the Firestore database
        await userRef.update({
          username: newUsername || "", // Use empty string as default value if newUsername is undefined
          score: newScore,
        });
  
        // Update the currentUser state with the new username and score as well
        setCurrentUser((prevUser) => ({
          ...prevUser,
          username: newUsername || "", // Use empty string as default value if newUsername is undefined
          score: newScore,
        }));
      } else {
        // Create a new user document
        await userRef.set({
          username: newUsername || "", // Use empty string as default value if newUsername is undefined
          score: newScore,
        });
  
        // Update the currentUser state with the new username and score as well
        setCurrentUser((prevUser) => ({
          ...prevUser,
          username: newUsername || "", // Use empty string as default value if newUsername is undefined
          score: newScore,
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
  const updateProfile = async (displayName) => {
    if (!currentUser) {
      throw new Error("No user is currently logged in");
    }
  
    try {
      await auth.updateProfile(currentUser, { displayName });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        displayName: displayName,
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
      throw new Error("Failed to update profile: " + error.message);
    }
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
  const fetchScores = async () => {
    setScoreLoading(true);
    try {
      // Example code: Fetch scores from Firestore
      const scoresData = await firestore.collection("scores").get();
      const scores = scoresData.docs.map((doc) => doc.data());
      setScores(scores);
    } catch (error) {
      setScoreError("Failed to fetch scores");
    }
    setScoreLoading(false);
  };
  const fetchUserData = async (user) => {
    if (user) {
      const userRef = firestore.collection("users").doc(user.uid);
      const doc = await userRef.get();
      if (doc.exists) {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          score: doc.data().score,
        }));
      }
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      fetchUserData(user);
      setLoading(false);
    });

    fetchScores(); // Fetch scores when the component mounts

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
    fetchScores,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
  );
}

export default AuthProvider;
