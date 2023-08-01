import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; 

export const fetchRandomCorrectWord = async () => {
  try {
    const firestore = firebase.firestore();

    // Get the document reference for the words collection (use a fixed document ID)
    const wordsCollectionRef = firestore.collection("words").doc("wordset_all");

    const currentData = await wordsCollectionRef.get();
    const existingWords = currentData.exists ? currentData.data().words : [];

    const randomIndex = Math.floor(Math.random() * existingWords.length);
    const randomCorrectWord = existingWords[randomIndex];

    return randomCorrectWord;
  } catch (error) {
    console.error("Error fetching random correct word from Firestore:", error);
    throw error;
  }
};