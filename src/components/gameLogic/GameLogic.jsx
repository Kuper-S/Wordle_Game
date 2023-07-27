// gameLogic.js
export function onEnter(gameState, correctWord, setGameStateProperty, toast, updateUserScore) {
    // Your onEnter logic here
  }
  export function handleRestartGame(gameState, correctWord, setGameStateProperty, toast){
    {
      const words = await generateWordSet();
      setShowConfetti(false);
      setGameState((prevState) => ({
        ...prevState,
        wordList: words.wordSet,
        wordSet: words.wordSet,
        correctWord: words.todaysWord,
        wordIndex: 0,
        wordsGuessed: [],
        totalAttempts: 0,
        numWordsGuessed: 0,
        board: boardDefault,
        currAttempt: { attempt: 0, letter: 0 },
        disabledLetters: [],
        gameOver: { gameOver: false, guessedWord: false },
        gameFinished: false,
        numAttempts: 0,
        showNextWordButton: false,
      }));
    };
  }
  export function handleNextWord(gameState, generateWordSet, setGameStateProperty, setShowConfetti) {
    // Your handleNextWord logic here
  }
  export function handleScoreBoardButton(){

  }
  export function onSelectLetter(){

   }

 export  function onDelete(){

   }
 export  function handleEndGameButton(){

   }
   export function handleConfirmEndGame(){
    
   }
   export function handleCancelEndGame(){

   }
//   const onEnter = async () => {
//     if (currAttempt.letter !== 5) return;
  
//     const enteredWord = board[currAttempt.attempt].join("");
  
//     if (wordSet.has(enteredWord.toLowerCase())) {
//       setGameStateProperty("currAttempt", {
//         attempt: currAttempt.attempt + 1,
//         letter: 0,
//       });
//     } else {
//       toast.error("Word not found");
//       return;
//     }
  
//     if (enteredWord.toLowerCase() === correctWord.toLowerCase()) {
//       setGameState((prevState) => ({
//         ...prevState,
//         gameFinished: true,
//         showNextWordButton: true,
//         wordsGuessed: [...prevState.wordsGuessed, enteredWord],
//         gameOver: { gameOver: true, guessedWord: true },
//       }));
//       toast.success("Great job!");
//       setShowConfetti(true);
  
//       // Update user score when the game is over
//       await updateUserScore(wordsGuessed, numAttempts);
  
//       return;
//     }
  
//     setGameStateProperty("numAttempts", numAttempts + 1);
  
//     if (currAttempt.attempt === 5) {
//       setGameState((prevState) => ({
//         ...prevState,
//         gameFinished: true,
//         gameOver: { gameOver: true, guessedWord: false },
//       }));
  
//       // Update user score when the game is over
//       await updateUserScore(wordsGuessed, numAttempts);
  
//       return;
//     }
//   };

  
//   const handleNextWord = async () => {
//     const words = await generateWordSet();
//     const guessedWord = board[currAttempt.attempt].join("");
//     const updatedWordsGuessed = [...wordsGuessed, guessedWord].filter(Boolean);
    
//     console.log("currAttempt.attempt" ,currAttempt.attempt)
//     setShowConfetti(false);
//     setGameState((prevState) => ({
//       ...prevState,
//       wordSet: words.wordSet,
//       correctWord: words.todaysWord,
//       wordIndex: wordIndex + 1,
//       board: boardDefault,
//       currAttempt: { attempt: 0, letter: 0 },
//       disabledLetters: [],
//       numAttempts: 0,
//       totalAttempts: totalAttempts + numAttempts,
//       showNextWordButton: wordList.length === wordIndex + 1 ? false : true,
//       showEndGameButton: wordList.length === wordIndex + 1 ? true : false,
//       numWordsGuessed: updatedWordsGuessed.length,
//       wordsGuessed: updatedWordsGuessed,
//       gameOver: { gameOver: false, guessedWord: false },
//       gameFinished: false,
//     }));
//   };


//   const handleScoreBoardButton = async () => {
//     if (userData) {
//       try {
//         setShowConfetti(false);
//         setGameStateProperty("showEndGameButton", true);
//         setLoadingScoreboard(true);
        
//         navigate("/scoreboard", { state: { userData } });
//         // Remove the navigate line from here
//       } catch (error) {
//         console.error("Error updating user data:", error);
//         // Handle error state or show an error message to the user
//       }
//     } else {
//       console.log('ERROR updating user data from game page');
//     }
//   };
  
  


//   const handleRestartGame = async () => {
//     const words = await generateWordSet();
//     setShowConfetti(false);
//     setGameState((prevState) => ({
//       ...prevState,
//       wordList: words.wordSet,
//       wordSet: words.wordSet,
//       correctWord: words.todaysWord,
//       wordIndex: 0,
//       wordsGuessed: [],
//       totalAttempts: 0,
//       numWordsGuessed: 0,
//       board: boardDefault,
//       currAttempt: { attempt: 0, letter: 0 },
//       disabledLetters: [],
//       gameOver: { gameOver: false, guessedWord: false },
//       gameFinished: false,
//       numAttempts: 0,
//       showNextWordButton: false,
//     }));
//   };

//   const onSelectLetter = (key) => {
//     if (currAttempt.letter > 4) return;
  
//     const newBoard = board.map((row, index) => {
//       return index === currAttempt.attempt ? [...row] : row;
//     });
    
//     newBoard[currAttempt.attempt][currAttempt.letter] = key;
//     setGameStateProperty("board", newBoard);
//     setGameStateProperty("currAttempt", {
//       attempt: currAttempt.attempt,
//       letter: currAttempt.letter + 1,
//     });
//     const guessedLetter = newBoard[currAttempt.attempt][currAttempt.letter];
//     if (guessedLetter === correctWord[currAttempt.letter]) {
//       setShowConfetti(true);
//     }
//   };
  
//   const onDelete = () => {
//     if (currAttempt.letter === 0) return;
  
//     const newBoard = [...board];
//     newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
//     setGameStateProperty("board", newBoard);
//     setGameStateProperty("currAttempt", {
//       ...currAttempt,
//       letter: currAttempt.letter - 1,
//     });
//   };

//   const handleEndGameButton = () => {
//     setShowConfetti(false);
//     setShowModal(true);
//   };
  
//   const handleConfirmEndGame = () => {
//     // Reset the game state and close the modal
//     setGameState((prevState) => ({
//       ...prevState,
//       wordIndex: 0,
//       wordsGuessed: [],
//       totalAttempts: 0,
//       numWordsGuessed: 0,
//       board: boardDefault,
//       currAttempt: { attempt: 0, letter: 0 },
//       disabledLetters: [],
//       gameOver: { gameOver: true, guessedWord: false },
//       gameFinished: true,
//       numAttempts: 0,
//       showNextWordButton: false,
//     }));
//     setShowModal(false);
  
//     navigate('/home');
//   };
  
//   const handleCancelEndGame = () => {
//     setShowModal(false);
//   };
