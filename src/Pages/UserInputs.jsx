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
    const [carDataKeys, setCarDataKeys] = useState([]); //dataKey-ek tárolásához kell

 //deklarálom az útvnalak rögzítéshaz szükséges state-eket, változókat
    const dataTable = "utvonalak"; 
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [honnanTelepules, setHonnanTelepules] = useState('');
    const [honnanUtca, setHonnanUtca] = useState('');
    const [honnanHazszam, setHonnanHazszam] = useState('');
    const [hovaTelepules, setHovaTelepules] = useState('');
    const [hovaUtca, setHovaUtca] = useState('');
    const [hovaHazszam, setHovaHazszam] = useState('');
    const [partner, setPartner] = useState('');
    const [km, setKm] = useState('');
    const [filledFieldsStatus, setfilledFieldsStatus] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');
    // const dataDoc -ot most nem használom dataRef.ref().child(dataTable).child(dataDoc).set(dataFields)
    //set helyett push-al teszem be az adatokat az adatbázisba, hogy minden rögzített adat
    // a firebase által generált unique document id-t kapjon

   const addUtvonalToDatabase= async ()=>{
    //az adatok elküldése előtt elenörzöm, hogy van üres mező
        if (honnanTelepules.trim() === '' ||
        honnanUtca.trim() === '' ||
        honnanHazszam.trim() === '' ||
        hovaTelepules.trim() === '' ||
        hovaUtca.trim() === '' ||
        hovaHazszam.trim() === '' ||
        partner.trim() === '' ||
        km.trim() === '') {
        setfilledFieldsStatus('Kérlek, töltsd ki az összes kötelező mezőt!');
        setTimeout(() => {
            setfilledFieldsStatus('');
          }, 1800);
            return;
        }
        try {
        //lekére az aktuális időt és frissítem a stateket
        const currentDateTime = new Date();
        const formattedDate = currentDateTime.toLocaleDateString();
        const formattedTime = currentDateTime.toLocaleTimeString();
            setDate(formattedDate);
            setTime(formattedTime);
        // az adabázisba bekerülő strukturált adatok
        const dataFields = {
            dateAndtime: {
                date: date,
                time: time
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
        }
        //elküldöm az adatokat at adatbázisnak
        await dataRef.ref().child(dataTable).push(dataFields);
        setUploadStatus('Sikeres mentés!');
       } catch (error) {
        setUploadStatus('Ooopsz! Valami hiba történt');
            }finally {
            setTimeout(() => {
                setUploadStatus('');
            }, 1800);
    }
}
   useEffect(() => {

   /*   const fetchData = async () => {
     const snapshot = await dataRef.ref().child(dataTable).child(dataKey).once('value');
     const fetchedData = snapshot.val();
     setData(fetchedData);

      };
       fetchData();

       const fetchDataKeys = async () => {
         const snapshot = await dataRef.ref().child(dataTable).once('value');
         const keys = Object.keys(snapshot.val() || {}); // Ha nincs adat, akkor üres objektum, tehát itt kezeljük le
   
         setDataKeys(keys);
       };
   
       fetchDataKeys(); */
    }, []); 
  
   
   return(
       <>
        <BackToHome/>
            <h1>Útvonal rögzítése:</h1>
            <CarsFromDatabase/>
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
                    <label required className="addcar-Label">Megtett Kilóméter:</label>
                    <input required className="addcar-Input" value={km} type='text' onChange={(e)=>{setKm(e.target.value)}}/>
              
              </div>
            </div>
            <div className="input-container">
            <h2 className="h2">Adja meg az uticélt:</h2>
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
            <h3 className="h3" >{uploadStatus}</h3>
            <h3 className="h3" >{filledFieldsStatus}</h3>
                
            </div>
       </>
   );
}