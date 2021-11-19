// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJoTsahSX34YqIJEVBc-Jgl4JlFK4GcpU",
  authDomain: "tinder-2-yt-820ee.firebaseapp.com",
  projectId: "tinder-2-yt-820ee",
  storageBucket: "tinder-2-yt-820ee.appspot.com",
  messagingSenderId: "390081284041",
  appId: "1:390081284041:web:b780861bfd45cc732c4a18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db }