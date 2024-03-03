// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

  
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEXnOuLfVgbEw5THtLsnTJMTEXdDkFCXI",
  authDomain: "slotsfire-c2552.firebaseapp.com",
  databaseURL: "https://slotsfire-c2552.firebaseio.com",
  projectId: "slotsfire-c2552",
  storageBucket: "slotsfire-c2552.appspot.com",
  messagingSenderId: "337384928398",
  appId: "1:337384928398:web:9e493cb3a9d92b6d5745df"
};

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const  database = getDatabase(app);

    export default database;
