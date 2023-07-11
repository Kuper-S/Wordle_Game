import { useEffect, useState } from 'react';
import { firestore } from '../services/firebase';

export const calculateOverallScore = (user, totalAttempts) => {
  const { wordsGuessed = [] } = user;
  const guessedWordsCount = Array.isArray(wordsGuessed) ? wordsGuessed.length : 0;
  const calculatedScore = (guessedWordsCount * 10) - totalAttempts;

  // Check if the necessary properties exist before returning the overall score
  if (!isNaN(calculatedScore) && Number.isFinite(calculatedScore)) {
    return calculatedScore;
  }

  return 0; // Return 0 if the overall score couldn't be calculated
};

export const fetchScoresForAllUsers = async () => {
  try {
    const usersCollectionRef = firestore.collection('users');
    const querySnapshot = await usersCollectionRef.get();
    const scores = querySnapshot.docs.map((doc) => {
      const user = doc.data();
      const overallScore = calculateOverallScore(user);
      return { ...user, overallScore };
    });
    return scores;
  } catch (error) {
    console.error('Error retrieving user scores:', error);
    throw new Error('Failed to fetch scores');
  }
};
