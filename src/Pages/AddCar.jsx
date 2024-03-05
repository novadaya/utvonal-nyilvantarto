import BackToHome from "../Components/BackToHome";
import React, { useState, useRef} from 'react';
import { dataRef } from "../Components/FirebaseConfig";
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import '../App.css';

export default function AddCar() {
    //deklarálom az autó rögzítéshaz szükséges változókat
    const dataCollection = "jarmuvek";
    const [rendszam, setRendszam] = useState('');
    const [marka, setMarka] = useState('');
    const [fogyasztas, setFogyasztas] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');

    //Beteszem az adatbázisba az adatokat

    const addCarToDatabase= async ()=>{
            //létrehozom az adatbázisba rögzítéshez szükséges mezőket
            try {
                const dataFields = {
                    rendszam: rendszam,
                    marka: marka,
                    fogyasztas: fogyasztas,
                };
                //setDataDoc(rendszam);
    
                await dataRef.ref().child(dataCollection).child(rendszam).set(dataFields); 
                console.log("ok");
                setRendszam("");
                setMarka('');
                setFogyasztas('');
                setUploadStatus('Sikeres mentés!');
            } catch (error) {
                setUploadStatus('Ooopsz! Valami hiba történt');
            }finally {
                setTimeout(() => {
                    setUploadStatus('');
                  }, 1400);
            }
            
    }

    return (
     <>
        <BackToHome />
            <div className="header">
            <h1>Jármű adatai:</h1>
            <p>Add meg a rögzíteni kívánt jármű adatait</p>
            </div>
            <div className="box-container">
            <div className="box">
                <label className="addcar-Label">Rendszám:</label>
                    <input className="addcar-Input" value={rendszam} type='text' onChange={(e)=>{setRendszam(e.target.value)}}/>
                <label className="addcar-Label">Márka:</label>
                    <input className="addcar-Input" value={marka} type='text' onChange={(e)=>{setMarka(e.target.value)}} />
                <label className="addcar-Label">Fogyasztás:</label>
                    <input className="addcar-Input" value={fogyasztas} type="text" placeholder="liter/100 km" onChange={(e)=>{setFogyasztas(e.target.value)}}/>
                <button className="default-button add-car-button" onClick={addCarToDatabase}>Rögzítés</button>
                <h3>{uploadStatus}</h3>
            </div>
            </div>
     </>
    );
}