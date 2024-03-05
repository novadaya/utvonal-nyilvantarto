import BackToHome from "../Components/BackToHome";
import React, { useState, useRef} from 'react';
import { dataRef } from "../Components/FirebaseConfig";
import '../App.css';

export default function AddCar() {
    //deklarálom az autó rögzítéshaz szükséges változókat
    const dataCollection = "jarmuvek";
    const [rendszam, setRendszam] = useState('');
    const [marka, setMarka] = useState('');
    const [fogyasztas, setFogyasztas] = useState('');
    const [responseStatus, setResponseStatus] = useState('');

    //Beteszem az adatbázisba az adatokat

    const addCarToDatabase= async ()=>{
        //ellenörzöm hogy a fogyastás szám-e és nem üres
        if (isNaN(fogyasztas) || fogyasztas === ''){
            setResponseStatus("A fogyasztás csak szám lehet. A tizedes értéket ponttal add meg!");
            setTimeout(() => {
                setResponseStatus('');
              }, 1800);
                return;
        }
        //az adatok elküldése előtt elenörzöm, hogy van üres mező
        if (rendszam.trim() === '' ||
        marka.trim() === '' ||
        fogyasztas.trim() === '') {
        setResponseStatus('Kérlek, töltsd ki az összes kötelező mezőt!');
        setTimeout(() => {
            setResponseStatus('');
          }, 1800);
            return;
        }
            //létrehozom az adatbázisba rögzítéshez szükséges mezőket
            try {
                const dataFields = {
                    rendszam: rendszam,
                    marka: marka,
                    fogyasztas: fogyasztas,
                };
    
                await dataRef.ref().child(dataCollection).child(rendszam).set(dataFields); 
                setRendszam("");
                setMarka('');
                setFogyasztas('');
                setResponseStatus('Sikeres mentés!');
            } catch (error) {
                setResponseStatus('Ooopsz! Valami hiba történt');
            }finally {
                setTimeout(() => {
                    setResponseStatus('');
                  }, 1800);
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
                <h3 className="h3" >{responseStatus}</h3>
            </div>
            </div>
     </>
    );
}