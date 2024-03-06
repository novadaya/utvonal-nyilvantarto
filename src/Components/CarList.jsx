import React, { useState, useEffect } from 'react';
import { dataRef } from './FirebaseConfig';

export default function CarList({ onSelectionChange }) {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    // Lekérjük az autók adatait a Firebase adatbázisból
    const fetchData = async () => {
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
        console.error('Hiba adatainak lekérése közben:', error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (rendszam) => {
    onSelectionChange(rendszam);
  };


  return (
    <>
    <div className='carlist-box'>
      <h2>Valaszd ki a járművet/járműveket</h2>
      <ul className='carlist-ul'>
        {carList.map(car => (
          <li className='carlist-li' key={car.rendszam}>
          <label className="carlist-checkbox-label">
          <input type="checkbox" className="carlist-checkbox" value={car.rendszam} onChange={() => handleCheckboxChange(car.rendszam)}/>
          {`${car.rendszam}`}</label>
          <label className='carlist-label2'>{`${car.marka}, ${car.fogyasztas} liter/km`}</label>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}