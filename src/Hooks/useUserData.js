
// import { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { firestore } from '../services/firebase';

// const useUserData = () => {
//   const [userData, setUserData] = useState(null);
//   const { currentUser } = useAuth();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (currentUser) {
//         try {
//           const userRef = firestore.collection('users').doc(currentUser.uid);
//           const userDoc = await userRef.get();

//           if (userDoc.exists) {
//             const userData = userDoc.data();
//             setUserData({ uid: currentUser.uid, ...userData });
//           }
//         } catch (error) {
//           console.error('Failed to fetch user data:', error);
//         }
//       }
//     };

//     fetchUserData();
//   }, [currentUser]);

//   return userData;
// };


// export default useUserData;


import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { firestore } from '../services/firebase';

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userRef = firestore.collection('users').doc(currentUser.uid);
          const userDoc = await userRef.get();

          if (userDoc.exists) {
            const userData = userDoc.data();
            setUserData({ uid: currentUser.uid, ...userData });
          } else {
            // Create a new user document with initial values
            const initialData = {
              score: 0,
              attempts: 0,
              guessit: false,
            };
            await userRef.set(initialData);
            setUserData({ uid: currentUser.uid, ...initialData });
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  return userData;
};

export default useUserData;

