import { firestore } from "../services/firebase";

export const fetchAllUsersData = async () => {
  try {
    const usersSnapshot = await firestore.collection("users").get();
    const usersData = [];
    usersSnapshot.forEach((doc) => {
      if (doc.exists) {
        usersData.push(doc.data());
      }
    });
    return usersData;
  } catch (error) {
    console.error("Error fetching users data:", error);
    throw new Error("Failed to fetch users data: " + error.message);
  }
};