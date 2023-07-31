export const calculateOverallScore = (numWordsGuessed, totalAttempts) => {
  // Customize the scoring formula based on your requirements
  const overallScore =( numWordsGuessed * 10) - totalAttempts;
  return overallScore;
};