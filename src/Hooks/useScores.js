export const calculateOverallScore = (numWordsGuessed, totalAttempts) => {
  const overallScore =( numWordsGuessed * 10) - totalAttempts;
  return overallScore;
};