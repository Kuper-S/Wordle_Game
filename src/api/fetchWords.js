import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; // Import the Firestore module
import wordBank from "../utils/wordle-bank.txt";

export const generateWordSet = async () => {
  try {
    const wordSet = new Set();
    const todaysWord = [];

    // Read the words from the a_words.txt file
    const response = await fetch(wordBank);
    const result = await response.text();
    const wordArr = result.split("\n");

    // Add each word to the Set and the todaysWord array
    wordArr.forEach((word) => {
      const trimmedWord = word.trim();
      wordSet.add(trimmedWord);
      todaysWord.push(trimmedWord);
    });

    // Get the Firestore reference
    const firestore = firebase.firestore();

    // Get the document reference for the words collection (use a fixed document ID)
    const wordsCollectionRef = firestore.collection("words").doc("wordset_all");

    // Get the current data from the document
    const currentData = await wordsCollectionRef.get();
    const existingWords = currentData.exists ? currentData.data().words : [];

    // Merge the existing words array with the new words array
    const updatedWords = [...existingWords, ...todaysWord];

    // Use batched writes for better performance
    const batch = firestore.batch();

    // Update the document with the new array of words
    batch.set(wordsCollectionRef, { words: updatedWords });

    // Commit the batched write to Firestore
    await batch.commit();

    return { wordSet, todaysWord };
  } catch (error) {
    console.error("Error adding words to Firestore:", error);
    throw error;
  }
};
