// import { useAuth } from "../context/AuthContext";

// function GuessingComponent() {
//   const { currentUser, updateUserData } = useAuth();

//   const handleRevealWord = (word) => {
//     // Calculate the score based on the number of guesses
//     const score = calculateScore();

//     // Update the user's score in Firestore
//     updateUserData(currentUser.username, score);
//   };

//   return (
//     <div>
//       {/* Other component code */}
//       <Score
//         currentGuesses={currentGuesses}
//         maxGuesses={maxGuesses}
//         score={currentUser.score} // Pass the score as a prop
//       />
//     </div>
//   );
// }
