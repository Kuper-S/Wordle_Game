import 'firebase/compat/auth'
import * as firebaseui from 'firebaseui'
import { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebaseui/dist/firebaseui.css';

// Environment variables
const firebaseConfig = {
  apiKey: "AIzaSyDpIsXIFQNhkJ6O7rkz0eURYv9IJL3C9iU",
  authDomain: "wordle-game-superkuper.firebaseapp.com",
  projectId: "wordle-game-superkuper",
  storageBucket: "wordle-game-superkuper.appspot.com",
  messagingSenderId: "959762425502",
  appId: "1:959762425502:web:ae8fded2779d79d86b3d8f",
  measurementId: "G-MB0Q207D79"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export const Firebase = () => {
  const [user, setUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)

    ui.start('.firebase-auth-container', {
      signInFlow: 'popup',
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
      ],
      signInSuccessUrl: '/page-router',
    })
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
    })

    return unsubscribe
  }, [])

  console.log('user', user)

  return <div className="firebase-auth-container"></div>
}