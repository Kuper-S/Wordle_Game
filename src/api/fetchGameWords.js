import firebase from "firebase/compat/app";
import "firebase/firestore";

export async function fetchGameWords() {
  try {
    // Get the Firestore reference
    const firestore = firebase.firestore();

    // Get the document reference for the words collection (use a fixed document ID)
    const wordsCollectionRef = firestore.collection("words").doc("wordset_all");

    // Get the current data from the document
    const currentData = await wordsCollectionRef.get();
    const wordset_all = currentData.exists ? currentData.data().words : [];

    return wordset_all;
  } catch (error) {
    console.error("Error fetching game words:", error);
    return [];
  }
}