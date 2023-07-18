import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { firestore } from '../services/firebase';

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (firestore && currentUser) {
          const userDoc = await firestore
            .collection('users')
            .doc(currentUser.uid)
            .get();

          if (userDoc.exists) {
            const userData = {
              ...userDoc.data(),
              uid: currentUser.uid,
            };
            setUserData(userData);
          } else {
            setUserData(null);
          }
        } else {
          setUserData(null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setErrorMessage('Failed to fetch user data: ' + error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  return { userData, loading, errorMessage };
};

export default useUserData;