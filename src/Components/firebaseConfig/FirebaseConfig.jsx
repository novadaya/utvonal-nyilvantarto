import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDqNldgCTzyRbZu7_pJdaNabsroTk78Hcs",
  authDomain: "utvonaltervezo-d7071.firebaseapp.com",
  projectId: "utvonaltervezo-d7071",
  storageBucket: "utvonaltervezo-d7071.appspot.com",
  messagingSenderId: "666628311431",
  appId: "1:666628311431:web:7399fad2be04bb7d7fab22"
};
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app)
const txtDB = getFirestore(app)

export {imgDB,txtDB};
