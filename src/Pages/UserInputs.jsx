import BackToHome from "../Components/BackToHome";
import React, { useState} from 'react';
import { dataRef } from "../Components/FirebaseConfig";
import CarList from "../Components/CarList";
import './UserInputs.css';
import '../App.css';

export default function UserInput() {
 //a járművek adatait fogja tárolni a checkbox-okból
    const [selectedCars, setSelectedCars] = useState({});

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

    const handleSelectionChange = (rendszam, fogyasztas, checked) => {
      //itt kezelem a checkbox-ok változását
      const isCarSelected = selectedCars.hasOwnProperty(rendszam);
    
      if (!isCarSelected) {
        console.log("első");
        // Ha a rendszám nincs az objektumban, akkor hozzáadom
        setSelectedCars(prevCars => ({
          ...prevCars,
          [rendszam]: { rendszam, fogyasztas }
        }));
      } else if (isCarSelected) {
        console.log("masodik");
        // Ha a rendszám benne van az objektumban akkor törlöm
        const { [rendszam]: deletedCar, ...rest } = selectedCars;
        setSelectedCars(rest);
      }
    }    
  
   const addUtvonalToDatabase= async ()=>{
    //a handleSelectionChange-ben kapott objektumot átalakítom
    // iterálható legyen akey-ek alapján
      const modifiedCars = {};
      let index = 0;
      for (const key in selectedCars) {
        if (selectedCars.hasOwnProperty(key)) {
          modifiedCars[index] = selectedCars[key];
          index++;
        }}

       //Kiválasztott e a felhasználó legalább egy autót
        if (selectedCars.length === 0) {
          setResponseStatus("Legalább egy járművet választanod kell!")
            setTimeout(() => {
                setResponseStatus('');
              }, 1800);
                return;
        }
    
        //ellenörzöm hogy a km (kilométer) szám-e és nem üres
        if (isNaN(km) || km.trim() === ''){
            setResponseStatus("A kiométer (km) csak szám lehet")
            setTimeout(() => {
                setResponseStatus('');
              }, 1800);
                return;
        }
        
        // Az adatok elküldése előtt ellenőrzöm, hogy van-e üres mező
        const requiredFields = [
          honnanTelepules, honnanUtca, honnanHazszam,
          hovaTelepules, hovaUtca, hovaHazszam,
          partner, km
        ];

        if (requiredFields.some(field => field.trim() === '')) {
          // Visszajelzés a felhasználónak
          setResponseStatus('Kérlek, töltsd ki az összes mezőt!');
          setTimeout(() => {
            setResponseStatus('');
          }, 1800);
          return;
        }
        //megnézem, hány autót választottak ki és
        //anyiszor fogom az adatbázisba feltölteni az adatokat ahányat kijelöltek
        //ez azért fontos, hogy a későbbi szűréseknél egyszerűbb dolgom legyen
      
        for (let i = 0; i < Object.keys(modifiedCars).length; i++) {
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
              km: km,
              rendszam: modifiedCars[i].rendszam,
              fogyasztas: modifiedCars[i].fogyasztas
            };
        
            // Elküldöm az adatokat a Firebase adatbázisnak
            await dataRef.ref().child(dataTable).push(dataFields);
            setResponseStatus('Sikeres mentés!');
          } catch (error) {
            console.error(error);
            setResponseStatus('Ooopsz! Valami hiba történt');
          } finally {
            setTimeout(() => {
               // Állapotok visszaállítása üres stringre
              setResponseStatus('');
              setHonnanTelepules('');
              setHonnanUtca('');
              setHonnanHazszam('');
              setHovaTelepules('');
              setHovaUtca('');
              setHovaHazszam('');
              setPartner('');
              setKm('');
            }, 1800);
          }
        }
        
} 
   return(
       <>
        <BackToHome/>
        <CarList onSelectionChange={handleSelectionChange}/>

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