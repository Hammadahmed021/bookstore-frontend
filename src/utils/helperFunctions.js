import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getIdToken, signInWithEmailAndPassword, deleteUser } from "firebase/auth";

// Function to generate Firebase ID token after registration
export const getFirebaseTokenForRegister = async (newUser) => {
  let user = null;
  try {
    // Step 1: Create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      newUser.email,
      newUser.password
    );
    
    user = userCredential.user;

    // Step 2: Generate Firebase ID token
    const token = await getIdToken(user);

    // Return the token and user object
    return { token, user };
  } catch (error) {
    // If an error occurs, delete the user from Firebase if they were created
    if (user) {
      try {
        await deleteUser(user);  // Corrected: delete user directly
        console.log("User deleted successfully due to error.");
      } catch (deleteError) {
        console.log("Unable to delete user from Firebase:", deleteError);
      }
    }
    console.error("Firebase token generation error:", error);
    throw new Error("Error generating Firebase token");
  }
};


// Function to generate Firebase ID token after login
export const getFirebaseTokenForLogin = async (newUser) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      newUser.email,
      newUser.password
    );
    const user = userCredential.user;
    const token = await getIdToken(user); // Generate Firebase ID token
    return { token, user };
  } catch (error) {

    console.error("Firebase token generation error: ", error);
    throw new Error("Error generating Firebase token");
  }
};

