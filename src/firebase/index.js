import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut
} from "firebase/auth";
import { auth } from "./firebase.config";
import { getBaseURL } from "../utils/getBaseUrl";



// Function to sign in with Google
export const SignUpWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential) {
      console.error("Error in user Credential");
      return;
    }

    const user = result.user;
    // Get the ID token
    const idToken = await user.getIdToken();
    return idToken;

  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error; // Propagate the error to be handled by the calling function
  }
};


// export const SignUpWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   const result = await signInWithPopup(auth, provider);

//   const credential = GoogleAuthProvider.credentialFromResult(result);
//   if (!credential) {
//     throw new Error("Error in user credential");
//   }

//   const user = result.user;
//   return await user.getIdToken();
// };


// Function to sign up with email and password
export const SignupWithEmail = async (email, password) => {
  if (!email || !password) {
    console.error("Provide Email and Password");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Get the ID token
    const token = await user.getIdToken();
    console.log(user, token);
    return { user, token };

  } catch (error) {
    console.error("Error signing in with email:", error);
    throw error; // Propagate the error to be handled by the calling function
  }
};

// Function to sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error; // Propagate the error to be handled by the calling function
  }
};
