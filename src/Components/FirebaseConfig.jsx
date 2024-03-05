
//import { initializeApp } from "firebase/app";
//import { getFirestore } from "firebase/firestore";
//import { getDatabase } from "firebase/database";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


  const firebaseConfig = {
    apiKey: "AIzaSyDqNldgCTzyRbZu7_pJdaNabsroTk78Hcs",
    authDomain: "utvonaltervezo-d7071.firebaseapp.com",
    databaseURL: "https://utvonaltervezo-d7071-default-rtdb.firebaseio.com",
    projectId: "utvonaltervezo-d7071",
    storageBucket: "utvonaltervezo-d7071.appspot.com",
    messagingSenderId: "666628311431",
    appId: "1:666628311431:web:7399fad2be04bb7d7fab22"
};

firebase.initializeApp(firebaseConfig);
export const dataRef=firebase.database();
export default firebase;