// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy15g_9h0U4ZYyUTJ3LdLaW6yN-I7Jisw",
  authDomain: "supergear-230a8.firebaseapp.com",
  projectId: "supergear-230a8",
  storageBucket: "supergear-230a8.firebasestorage.app",
  messagingSenderId: "833856316783",
  appId: "1:833856316783:web:25853977685474c61b349a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();