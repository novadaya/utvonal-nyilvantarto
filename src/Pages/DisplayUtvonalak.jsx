import BackToHome from "../Components/BackToHome";
import { useEffect, useState } from 'react';
import { dataRef } from "../Components/FirebaseConfig";
import AllTotal from "../Components/allTotal";


export default function DisplayUtvonalak() {
  const [utvonalak, setUtvonalak] = useState([]);
  const dataTable = "utvonalak"; 
  const [carList, setCarList] = useState([]);
  
  useEffect(() => {
    // Lekérem az összes útvonalat az adatbázisból
    const fetchData = async () => {
      try {
        const snapshot = await dataRef.ref().child(dataTable).once('value');
        const utvonalakData = [];

        snapshot.forEach((childSnapshot) => {
          const utvonalData = childSnapshot.val();
          utvonalakData.push(utvonalData);
        });

        // Beállítom az állapotot az összes útvonalra
        setUtvonalak(utvonalakData);
      } catch (error) {
        console.error('Ooopsz! Valami hiba történt!', error);
      }
    };

    // Lekérem az autók adatait az adatbázisból
    fetchData();
    const fetchCarData = async () => {
      try {
        const snapshot = await dataRef.ref('jarmuvek').once('value');
        const cars = snapshot.val();
        if (cars) {
          const carArray = Object.keys(cars).map(rendszam => ({
            rendszam,
            marka: cars[rendszam].marka,
            fogyasztas: cars[rendszam].fogyasztas,
          }));
          setCarList(carArray);
        }
      } catch (error) {
        console.error('Oppsz! Valami hiba történt!', error);
      }
    };

    fetchCarData();
  }, []);

  //keresés a talátlatok között
  const [search, setSearch] = useState('');
  const filteredUtvonalak = utvonalak.filter((utvonal) => utvonal.rendszam.toLowerCase().includes(search.toLowerCase()));

    return (
    <>
      <BackToHome/>
      <div className="box">
       <div class="search">
        <input placeholder="Keresés Rendszám alapján..." type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>
    </div>
      <AllTotal />
      <h1>Rögzített útvonalak:</h1>
      <div className="box-container">
        {filteredUtvonalak.map((utvonal, index) => (
          <div className="box">
            <ul>
          <li key={index}>
            <h2>Rendszám: {utvonal.rendszam}</h2>
            <p>Honnan: {utvonal.honnan.telepules} {utvonal.honnan.utca} {utvonal.honnan.hazszam}</p>
            <p>Hova: {utvonal.hova.partner} {utvonal.hova.telepules} {utvonal.hova.utca} {utvonal.hova.hazszam}</p>
            <p className="km-p">Megtett Kilométer: {utvonal.km} km</p>
            <p>Dátum és idő: {utvonal.dateAndtime.date} {utvonal.dateAndtime.time}</p>
          </li>
          </ul>
          </div>
        ))}
    </div>
      </>
    );
}