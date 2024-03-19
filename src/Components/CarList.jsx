import React, { useState, useEffect } from 'react';
import db from "./FireStoreDb";

export default function CarList({ onSelectionChange }) {
  const [carList, setCarList] = useState([]);


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const snapshot = await db.collection('jarmuvek').get(); // Lekérdezés az 'jarmuvek' kollekcióra
        const cars = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCarList(cars);
      } catch (error) {
        console.error('Hiba az adatok lekérése közben:', error);
      }
    };

    fetchData();
  }, []);
  // Itt adom át a parent komponensnek a szükséges adatokat
  const handleCheckboxChange = (rendszam, fogyasztas) => {
    onSelectionChange(rendszam, fogyasztas);
  };


  return (
    <>
    <div className='carlist-box'>
      <h2>Valaszd ki a járművet/járműveket</h2>
      <ul className='carlist-ul'>
        {carList.map(car => (
          <li className='carlist-li' key={car.rendszam}>
          <label className="carlist-checkbox-label">
          <input type="checkbox" className="carlist-checkbox" value={car.rendszam} onChange={() => handleCheckboxChange(car.rendszam, car.fogyasztas)}/>
          {`${car.rendszam}`}</label>
          <label className='carlist-label2'>{`${car.marka}, ${car.fogyasztas} liter/km`}</label>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}