import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore, db} from "../services/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore';


export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // Set initial value to null
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState([]);
  const [scoreLoading, setScoreLoading] = useState(false);
  const [scoreError, setScoreError] = useState("");

  const signup = async (email, password, username) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
  
      const userRef = firestore.collection("users").doc(user.uid);
      const userData = {
        email,
        username,
        score: 0,
        attempts: 0, // Add the attempts variable with an initial value of 0
        guessit: false, // Add the guessit variable with an initial value of false
      };
  
      await user.updateProfile({ displayName: username }); // Update display name in Firebase Authentication
      await userRef.set(userData); // Create user document in Firestore
  
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
      // Update the user data in the Firestore database
      await userRef.update({
        username: newUsername || "", // Use empty string as default value if newUsername is undefined
        score: newScore,
        attempts: newAttempts,
        guessit: newGuessIt,
      });

      // Update the currentUser state with the new values
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username: newUsername || "", // Use empty string as default value if newUsername is undefined
        score: newScore,
        attempts: newAttempts,
        guessit: newGuessIt,
      }));
    } else {
      // Create a new user document
      await userRef.set({
        username: newUsername || "", // Use empty string as default value if newUsername is undefined
        score: newScore,
        attempts: newAttempts,
        guessit: newGuessIt,
      });

      // Update the currentUser state with the new values
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username: newUsername || "", // Use empty string as default value if newUsername is undefined
        score: newScore,
        attempts: newAttempts,
        guessit: newGuessIt,
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
  const logUserScores = async () => {
    try {
      const usersCollectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollectionRef);
  
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        const score = user.score;
        console.log(score);
      });
    } catch (error) {
      console.error('Error retrieving user scores:', error);
    }
  };
  logUserScores();
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
    logUserScores,
    
  };

  return (
    <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
  );
}

export default AuthProvider;
