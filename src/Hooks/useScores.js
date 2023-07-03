// import { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { firestore } from '../services/firebase';

// const useScores = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [usersData, setUsersData] = useState([]);
  
//   useEffect(() => {
//     const fetchScores = async () => {
//       setLoading(true);
//       try {
//         const usersCollectionRef = collection(firestore, 'users');
//         const querySnapshot = await getDocs(usersCollectionRef);

//         const scores = [];
//         querySnapshot.forEach((doc) => {
//           const user = doc.data();
//           // Check if the user has a score property
//           if (!user.hasOwnProperty('score')) {
//             user.score = 0; // Initialize score to zero
//           }
//           scores.push(user);
//         });
//         if (userData) {
//           const currentUserData = { uid: currentUser.uid, ...userData };
//           scores.push(currentUserData);
//         }
//         console.log('Scores:', scores);

//         setUsersData(scores);
//       } catch (error) {
//         console.error('Error retrieving user scores:', error);
//         setError('Failed to fetch scores');
//       }
//       setLoading(false);
//     };

//     fetchScores();
//   }, []);

//   return { loading, error, usersData };
// };

// export default useScores;


import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { firestore } from '../services/firebase';
import { collection, getDocs} from 'firebase/firestore';
import useUserData from './useUserData';

const useScores = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usersData, setUsersData] = useState([]);

  const { currentUser } = useAuth();
  const userData = useUserData();

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      try {
        const usersCollectionRef = collection(firestore, 'users');
        const querySnapshot = await getDocs(usersCollectionRef);

        const scores = [];
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          // Check if the user has a score property
          if (!user.hasOwnProperty('score')) {
            user.score = 0; // Initialize score to zero
          }
          scores.push(user);
        });

        // Fetch current user's data and add it to scores
        if (userData) {
          const currentUserData = { uid: currentUser.uid, ...userData };
          scores.push(currentUserData);
        }

        console.log('Scores:', scores);

        setUsersData(scores);
      } catch (error) {
        console.error('Error retrieving user scores:', error);
        setError('Failed to fetch scores');
      }
      setLoading(false);
    };

    fetchScores();
  }, [currentUser, userData]);

  return { loading, error, usersData };
};

export default useScores;
