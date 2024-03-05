import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

export default function CarList({ onSelectionChange }) {
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
  }, []);

  const handleCheckboxChange = (rendszam) => {
    // Itt kezelheted a kiválasztott checkbox-ok változását
    onSelectionChange(rendszam);
  };

  return (
    <div>
      <h2>Autók listája</h2>
      <ul>
        {carList.map(car => (
          <li key={car.rendszam}>
            <label>
              <input
                type="checkbox"
                value={car.rendszam}
                onChange={() => handleCheckboxChange(car.rendszam)}
              />
              {`${car.rendszam} - ${car.marka}, Fogyasztás: ${car.fogyasztas}`}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}