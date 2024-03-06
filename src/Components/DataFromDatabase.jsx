import React, { useState, useEffect } from 'react';
import { dataRef } from "./FirebaseConfig";

export default function DataFromDatabase() {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    // Lekérem az autók adatait a Firebase adatbázisból
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
        console.error('Oppsz! Valami hiba történt!', error);
      }
    };

    fetchData();
  }, []); 
  return (
    <div>
      <h2>Autók listája</h2>
      <ul>
        {carList.map(car => (
          <li key={car.rendszam}>
            Rendszám: {car.rendszam}, Márka: {car.marka}, Fogyasztás: {car.fogyasztas}
          </li>
        ))}
      </ul>
    </div>
  );
}