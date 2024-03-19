import BackToHome from "../Components/BackToHome";
import { useEffect, useState } from 'react';
import db from "../Components/FireStoreDb";
import AllTotal from "../Components/AllTotal";


export default function DisplayUtvonalak() {
  const [utvonalak, setUtvonalak] = useState([]);
  const dataTable = "utvonalak";
  
  useEffect(() => {
    // Lekérem az összes útvonalat az adatbázisból
    const fetchData = async () => {
      try {
        const querySnapshot = await db.collection(dataTable).get();
        const utvonalakData = [];

        querySnapshot.forEach((doc) => {
          const utvonalData = doc.data();
          utvonalakData.push(utvonalData);
        });

        setUtvonalak(utvonalakData);
      } catch (error) {
        console.error('Ooopsz! Valami hiba történt!', error);
      }
    };

    fetchData();
  }, []);

  //keresés a talátlatok között
  const [search, setSearch] = useState('');
  const filteredUtvonalak = utvonalak.filter((utvonal) => utvonal.rendszam.toLowerCase().includes(search.toLowerCase()));

    return (
    <>
      <BackToHome/>
      <div className="box">
       <div className="search">
        <input placeholder="Keresés Rendszám alapján..." type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>
    </div>
      <AllTotal />
      <h1>Rögzített útvonalak:</h1>
      <div className="box-container">
        {filteredUtvonalak.map((utvonal, index) => (
          <div className="box" key={index}>
            <ul>
          <li>
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