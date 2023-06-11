import React, { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import 'firebaseui/dist/firebaseui.css';
import { auth, firebaseConfig } from '../../services/firebase';
import * as firebaseui from 'firebaseui';
import { GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';

const SignUpPage = () => {
  useEffect(() => {
    // Check if an AuthUI instance already exists
    // Configure FirebaseUI
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    // Define the FirebaseUI configuration
    const uiConfig = {
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
      ],
        signInSuccessUrl: '/home',
    };

    // Start the FirebaseUI authentication flow
    ui.start('#firebaseui-auth-container', uiConfig);
  }, []);

  

  return (
    <div>
      <h2>Signup PAGE</h2>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default SignUpPage;
