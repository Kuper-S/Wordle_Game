import { useEffect, useState } from 'react';
import { firestore } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import useUserData from './useUserData';

const useScores = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usersData, setUsersData] = useState([]);

  const calculateOverallScore = (user) => {
    const { wordsGuessed = [], attempts } = user;
    const calculatedScore = wordsGuessed.length * 10 - attempts;
    console.log("calculateOverallScore :", calculatedScore)
    return calculatedScore;
  };
  
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
          // Calculate the overall score
          scores.push({ ...user, calculateOverallScore });
        });
        console.log(scores);
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
