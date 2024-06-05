
import firebase from "firebase/compat/app";

import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4FDCozT0bYffvJXPdMAhUXcUHc9uxGL0",
  authDomain: "clone-60a57.firebaseapp.com",
  projectId: "clone-60a57",
  storageBucket: "clone-60a57.appspot.com",
  messagingSenderId: "786827323786",
  appId: "1:786827323786:web:a5f26b32d249859708c073"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();