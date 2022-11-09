// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDl4qF0qhUPBLfGnK_2CZh3KldbLwdqhI",
    authDomain: "journal-app-49b6e.firebaseapp.com",
    projectId: "journal-app-49b6e",
    storageBucket: "journal-app-49b6e.appspot.com",
    messagingSenderId: "52723314832",
    appId: "1:52723314832:web:fe8c21efd942872cc9a815"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);