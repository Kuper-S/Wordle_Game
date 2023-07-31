import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../services/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import Spinner from 'react-bootstrap/Spinner';
import { Error } from "@mui/icons-material";

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
        totalAttempts: 0,
        wordsGuessed: [],
      };
      await user.updateProfile({ displayName: username });
      
      await userRef.set(userData);
      console.log(user);
      return { uid: user.uid, ...userData };
    } catch (error) {
      // Handle specific error cases and provide user-friendly messages
      if (error.code === "auth/invalid-email") {
        throw new Error("Invalid email address. Please provide a valid email.");
      } else if (error.code === "auth/email-already-in-use") {
        throw new Error("Email address already in use. Please use a different email.");
      } else if (error.code === "auth/weak-password") {
        throw new Error("Weak password. Please use a stronger password.");
      } else {
        // For other errors, provide a generic error message
        throw new Error("Failed to sign up. Please try again later.");
      }
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
        const currentTotalAttempts = userData?.totalAttempts || 0;
  
        if (newAttempts > currentTotalAttempts || newWordsGuessed.length > userData.wordsGuessed.length) {
          await userRef.update({
            wordsGuessed: newWordsGuessed || userData.wordsGuessed || [],
            totalAttempts: newAttempts,
          });
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
    // Clear the user session and remove the token from local storage
    localStorage.removeItem("token");
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      
      const { user } = result;
      const userRef = firestore.collection("users").doc(user.uid);
      
      const doc = await userRef.get();
      if (!doc.exists) {
        const userData = {
          uid: user.uid,
          username: user.displayName,
          wordsGuessed: [],
          overallScore: 0,
        };
        await userRef.set(userData);
      }
      
      return result;
    } catch (error) {
      console.log("Failed to sign in with Google: " + error.message);
    }
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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is logged in, set the current user
        setCurrentUser(user);
        setLoading(false);
      } else {
        // User is not logged in, check if there is a token in local storage
        const token = localStorage.getItem("token");
        console.log('localStorage token before: ' , token);
        if (token) {
          // Token exists, try to sign in with the token
          try {
            await auth.signInWithCustomToken(token);
            setCurrentUser(auth.currentUser);
            setLoading(false);
          } catch (error) {
            console.error("Failed to sign in with token:", error);
            console.error("Error code:", error.code);
            console.error("Error message:", error.message);
            setCurrentUser(null);
            setLoading(false);
          }
          console.log('localStorage token after: ' , token);
        } else {
          // No token, user is not logged in
          localStorage.removeItem("token");
          setCurrentUser(null);
          setLoading(false);

        }
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      // Save the user token in local storage when the user is logged in
      currentUser.getIdToken(/* forceRefresh */ true)
        .then((token) => {
          localStorage.setItem("token", token);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to get user token:", error);
          setLoading(false);
        });
    } else {
      // Remove the token from local storage when the user logs out
      localStorage.removeItem("token");
      setLoading(false);
    }
  }, [currentUser]);

  const value = {
    currentUser,
    setCurrentUser,
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
  function LoadingSpinner() {
    return <div className="loading-container" aria-live="assertive" role="status">
              <Spinner animation="grow" variant="warning" size="lg"  />
          </div>;
  }
  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

