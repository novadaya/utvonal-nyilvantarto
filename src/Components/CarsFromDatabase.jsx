import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

export default function CarsFromDatabase() {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    // Lekérjük az autók adatait a Firebase adatbázisból
    const fetchData = async () => {
      try {
        const snapshot = await firebase.database().ref('jarmuvek').once('value');
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
  }, []); // A dependency array üres, így csak a komponens mountolásakor fut le a useEffect.

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