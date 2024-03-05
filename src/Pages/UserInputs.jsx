import BackToHome from "../Components/BackToHome";
import React, { useState, useRef, useEffect} from 'react';
import { dataRef } from "../Components/FirebaseConfig";
import CarsFromDatabase from "../Components/CarsFromDatabase";
import './UserInputs.css';
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

export default function UserInput() {
    //az adatbázisból az járművek lekéréséhez szükséges adatok
    const carDataTable = "jarmuvek";
    const [carDataDoc, setCarDataDoc] = useState([]); //dataKey-ek tárolásához kell
    const [carsData, setCarsData] = useState([]); //a járművek adatait fogja tárolni

 //deklarálom az útvnalak rögzítéshaz szükséges state-eket, változókat
    const dataTable = "utvonalak"; 
    const [honnanTelepules, setHonnanTelepules] = useState('');
    const [honnanUtca, setHonnanUtca] = useState('');
    const [honnanHazszam, setHonnanHazszam] = useState('');
    const [hovaTelepules, setHovaTelepules] = useState('');
    const [hovaUtca, setHovaUtca] = useState('');
    const [hovaHazszam, setHovaHazszam] = useState('');
    const [partner, setPartner] = useState('');
    const [km, setKm] = useState('');
    const [responseStatus, setResponseStatus] = useState('');
    // const dataDoc -ot most nem használom dataRef.ref().child(dataTable).child(dataDoc).set(dataFields)
    //set helyett push-al teszem be az adatokat az adatbázisba, hogy minden rögzített adat
    // a firebase által generált unique document id-t kapjon

   const addUtvonalToDatabase= async ()=>{
        //ellenörzöm hogy a km (kilométer) szám-e és nem üres
        if (isNaN(km) || km === ''){
            console.log("sdkfcj")
            setResponseStatus("A kiométer (km) csak szám lehet")
            setTimeout(() => {
                setResponseStatus('');
              }, 1800);
                return;
        }
         //az adatok elküldése előtt elenörzöm, hogy van üres mező
        if (honnanTelepules.trim() === '' ||
        honnanUtca.trim() === '' ||
        honnanHazszam.trim() === '' ||
        hovaTelepules.trim() === '' ||
        hovaUtca.trim() === '' ||
        hovaHazszam.trim() === '' ||
        partner.trim() === '' ||
        km.trim() === '') {
        //visszajelzés a felhasználónak
            setResponseStatus('Kérlek, töltsd ki az összes kötelező mezőt!');
        setTimeout(() => {
            setResponseStatus('');
          }, 1800);
            return;
        }
        try {
        //lekérem az aktuális időt és beteszem a változókba
        const currentDateTime = new Date();
        const formattedDate = currentDateTime.toLocaleDateString();
        const formattedTime = currentDateTime.toLocaleTimeString();
        // az adabázisba bekerülő strukturált adatok
        const dataFields = {
            dateAndtime: {
                date: formattedDate,
                time: formattedTime
            },
            honnan: {
                telepules: honnanTelepules,
                utca: honnanUtca,
                hazszam: honnanHazszam
            },
            hova: {
                partner: partner,
                telepules: hovaTelepules,
                utca: hovaUtca,
                hazszam: hovaHazszam
            },
            km: km
            //ide még a rendszámot ne felejtsem el betenni!!!
        }
        //elküldöm az adatokat at adatbázisnak
        await dataRef.ref().child(dataTable).push(dataFields);
        setResponseStatus('Sikeres mentés!');
       } catch (error) {
        setResponseStatus('Ooopsz! Valami hiba történt');
            }finally {
            setTimeout(() => {
                setResponseStatus('');
            }, 1800);
    }
}
   useEffect(() => {
       async function fetchCarDataDoc() { //rendszámok lekérdezése
         const snapshot = await dataRef.ref().child(carDataTable).once('value');
         const dataDocument = Object.keys(snapshot.val() || {});
         setCarDataDoc(dataDocument);
         console.log(carDataDoc)
       };
       fetchCarDataDoc();
    }, []); 
  
   
   return(
       <>
        <BackToHome/>
        <div>
              <h3>DataKeys for DataTable: {carDataTable}</h3>
              <ul>
                {carDataDoc.map((key, index) => (
                  <li key={index}>{key}</li>
                ))}
              </ul>
            </div>

            <h1>Útvonal rögzítése:</h1>
            <div className="inputbox-container">
            <div className="input-container">
            <h2 className="h2">Honnan indul?</h2>
                <div className="input-box">
                    <label required className="addcar-Label">Település:</label>
                    <input required className="addcar-Input" value={honnanTelepules} type='text' onChange={(e)=>{setHonnanTelepules(e.target.value)}}/>
                    <label required className="addcar-Label">Utca:</label>
                    <input required className="addcar-Input" value={honnanUtca} type='text' onChange={(e)=>{setHonnanUtca(e.target.value)}}/> 
                    <label required className="addcar-Label">Házszám:</label>
                    <input required className="addcar-Input" value={honnanHazszam} type='text' onChange={(e)=>{setHonnanHazszam(e.target.value)}}/>
                    <label required className="addcar-Label">Megtett Kilométer (km):</label>
                    <input required className="addcar-Input" value={km} type='text' onChange={(e)=>{setKm(e.target.value)}}/>
              
              </div>
            </div>
            <div className="input-container">
            <h2 className="h2">Adja meg az úticélt:</h2>
                <div className="input-box">
                <label className="addcar-Label">Partner neve:</label>
                    <input required className="addcar-Input" type='text' value={partner} onChange={(e)=>{setPartner(e.target.value)}} />
                    <label required className="addcar-Label">Település:</label>
                    <input required className="addcar-Input" value={hovaTelepules} type='text' onChange={(e)=>{setHovaTelepules(e.target.value)}}/>
                    <label required className="addcar-Label">Utca:</label>
                    <input required className="addcar-Input" value={hovaUtca} type='text' onChange={(e)=>{setHovaUtca(e.target.value)}}/> 
                    <label required className="addcar-Label">Házszám:</label>
                    <input required className="addcar-Input" value={hovaHazszam} type='text' onChange={(e)=>{setHovaHazszam(e.target.value)}}/>
                </div>
            </div>
            <button className="input-button" onClick={addUtvonalToDatabase}>Útvonal Rögzítése</button>
            <h3 className="h3" >{responseStatus}</h3>   
            </div>
       </>
   );
}