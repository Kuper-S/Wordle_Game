import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import wordList from '../utils/wordle-bank.txt';

const firestore = firebase.firestore();

async function addWordsToFirestore() {
  try {
    const words = wordList.trim().split('\n').map((word) => word.trim());

    const batch = firestore.batch();
    const wordsCollectionRef = firestore.collection('words');

    words.forEach((word) => {
      const wordDocRef = wordsCollectionRef.doc();
      batch.set(wordDocRef, { word });
    });

    await batch.commit();

    console.log('Words added to Firestore successfully.');
  } catch (error) {
    console.error('Error adding words to Firestore check:', error);
  }
}

export default addWordsToFirestore;
