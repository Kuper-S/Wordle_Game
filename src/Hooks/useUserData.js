import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { firestore } from '../services/firebase';
import { getDocs } from 'firebase/firestore';

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userRef = firestore.collection("users").doc(currentUser.uid);
          const userDoc = await userRef.get();
          // const userSnapshot = await getDocs(userRef);
          // console.log('Snapshot of user' , userSnapshot);
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUserData({ uid: currentUser.uid, ...userData });
          } else {
            // Only create a new user document when signing up for the first time
            const initialData = {
              score: 0,
              attempts: 0,
              wordsGuessed: [],
              overallScore: 0,
              highestScore: 0,
              username: currentUser.username, // Provide a default value or leave it empty
            };
            await userRef.set(initialData);
            setUserData({ uid: currentUser.uid, ...initialData });
            console.log('New user created' , currentUser);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  return userData;
};


export default useUserData;
