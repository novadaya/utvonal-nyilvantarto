import "../App.css";
import { useState } from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
 
export default function SingleUserInput() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [telepules, setTelepules] = useState('');
    const [utca, setUtca] = useState('');
    const [hazszam, setHazszam] = useState('');
    const [partner, setPartner] = useState('');
    const [km, setKm] = useState('');

    const firebaseConfig = {
        apiKey: "AIzaSyBEXnOuLfVgbEw5THtLsnTJMTEXdDkFCXI",
        authDomain: "slotsfire-c2552.firebaseapp.com",
        databaseURL: "https://slotsfire-c2552.firebaseio.com",
        projectId: "slotsfire-c2552",
        storageBucket: "slotsfire-c2552.appspot.com",
        messagingSenderId: "337384928398",
        appId: "1:337384928398:web:9e493cb3a9d92b6d5745df"
      };

      initializeApp(firebaseConfig);
      const database = getDatabase();
      const usersRef = ref(database, 'users');

      const user = {
        name: "John Doe",
        email: "johndoe@example.com",
      };
    
      set(usersRef, user);
 
    const Push = () => {
        database.ref("user").set({
            name: date,
            age: km,
        }).catch(alert);
    }
 
    return (
        <div  style={{ marginTop: 250 }}>
            <center>
                <input placeholder="Enter your name" value={date}
                    onChange={(e) => setDate(e.target.value)} />
                <br /><br />
                <input placeholder="Enter your age" value={km}
                    onChange={(e) => setKm(e.target.value)} />
                <br /><br />
                <button onClick={Push}>PUSH</button>
            </center>
        </div>
    );
}


