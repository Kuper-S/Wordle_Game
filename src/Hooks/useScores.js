import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../services/firebase';

const useScores = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usersData, setUsersData] = useState([]);

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

        console.log('Scores:', scores);

        setUsersData(scores);
      } catch (error) {
        console.error('Error retrieving user scores:', error);
        setError('Failed to fetch scores');
      }
      setLoading(false);
    };

    fetchScores();
  }, []);

  return { loading, error, usersData };
};

export default useScores;
