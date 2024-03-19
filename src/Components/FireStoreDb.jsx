import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDqNldgCTzyRbZu7_pJdaNabsroTk78Hcs",
    authDomain: "utvonaltervezo-d7071.firebaseapp.com",
    databaseURL: "https://utvonaltervezo-d7071-default-rtdb.firebaseio.com",
    projectId: "utvonaltervezo-d7071",
    storageBucket: "utvonaltervezo-d7071.appspot.com",
    messagingSenderId: "666628311431",
    appId: "1:666628311431:web:7399fad2be04bb7d7fab22"
  };
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
 
export default db;