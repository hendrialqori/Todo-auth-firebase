// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBziNEjFuFGDnlCTNpMGsBA9M-Tt2s6-2Y",
  authDomain: "simple-note-firebase-44b64.firebaseapp.com",
  projectId: "simple-note-firebase-44b64",
  storageBucket: "simple-note-firebase-44b64.appspot.com",
  messagingSenderId: "573845093089",
  appId: "1:573845093089:web:3b542c5a5024f97ee555a0",
  measurementId: "G-TG7J9NX7GL",
  databaseURL : "https://simple-note-firebase-44b64-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);




