
// export const calculateOverallScore = (user, totalAttempts, newWordsGuessedCount) => {
//   const { wordsGuessed = [], overallScore = 0 } = user;

//   const guessedWordsCount = wordsGuessed.length + newWordsGuessedCount;
//   console.log('guessedWordsCount', guessedWordsCount);
//   console.log('newWordsGuessedCount', newWordsGuessedCount);
//   console.log('wordsGuessed', wordsGuessed);
//   console.log('overallScore', overallScore);
//   console.log('totalAttempts', totalAttempts);

//   const latestGameScore = guessedWordsCount * 10 - totalAttempts;

//   // Return the maximum score between the latest game score and the current overall score
//   return Math.max(latestGameScore, overallScore);
// };

export const calculateOverallScore = (numWordsGuessed, totalAttempts) => {
  // Customize the scoring formula based on your requirements
  const overallScore =( numWordsGuessed * 10) - totalAttempts;
  return overallScore;
};