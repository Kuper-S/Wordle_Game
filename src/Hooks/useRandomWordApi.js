import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; // Import the Firestore module

export const fetchRandomCorrectWord = async () => {
  try {
    // Get the Firestore reference
    const firestore = firebase.firestore();

    // Get the document reference for the words collection (use a fixed document ID)
    const wordsCollectionRef = firestore.collection("words").doc("wordset_all");

    // Get the current data from the document
    const currentData = await wordsCollectionRef.get();
    const existingWords = currentData.exists ? currentData.data().words : [];

    // Randomly select one word from the existing words
    const randomIndex = Math.floor(Math.random() * existingWords.length);
    const randomCorrectWord = existingWords[randomIndex];

    return randomCorrectWord;
  } catch (error) {
    console.error("Error fetching random correct word from Firestore:", error);
    throw error;
  }
};