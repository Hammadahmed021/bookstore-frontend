import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getIdToken, signInWithEmailAndPassword } from "firebase/auth";

// Function to generate Firebase ID token after registration
export const getFirebaseTokenForRegister = async (newUser) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
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

