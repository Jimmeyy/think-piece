import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkUIaXf-SsKxtBOCJ-NHEZdtSNmno3YhI",
  authDomain: "fem-learn-a43c4.firebaseapp.com",
  databaseURL: "https://fem-learn-a43c4.firebaseio.com",
  projectId: "fem-learn-a43c4",
  storageBucket: "fem-learn-a43c4.appspot.com",
  messagingSenderId: "793663122044",
  appId: "1:793663122044:web:bbe6941f244c479924b7f9"
};

firebase.initializeApp(firebaseConfig);
// Temp, only for debugingn purposes
window.firebase = firebase;

// Firestore / database
export const firestore = firebase.firestore();

// Authentication
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const singInWithGoogle = () => auth.signInWithPopup(provider);
export const signInWithEmailAndPassword = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};
export const signOut = () => auth.signOut();

// -------------------------------------------------------------------------
export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user", console.error);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;

  try {
    const userRef = await firestore.collection("users").doc(uid);
    return userRef;
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};

export default firebase;