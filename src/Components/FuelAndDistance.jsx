import { useEffect, useState } from 'react';
import { dataRef } from "./FirebaseConfig";
// ...

const DisplayCarData = () => {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lekérem az összes autót az adatbázisból
        const carsSnapshot = await dataRef.ref().child("jarmuvek").once('value');
        const carsData = [];

        carsSnapshot.forEach((carSnapshot) => {
          const car = carSnapshot.val();
          carsData.push(car);
        });

        // Lekérem az összes útvonalat az adatbázisból
        const utvonalakSnapshot = await dataRef.ref().child("utvonalak").once('value');
        const utvonalakData = [];

        utvonalakSnapshot.forEach((utvonalSnapshot) => {
          const utvonal = utvonalSnapshot.val();
          utvonalakData.push(utvonal);
        });

        // Összefűzöm az úvonalakat, az autókkal a rendszám alapján
        const mergedData = carsData.map((car) => {
          const matchingUtvonalak = utvonalakData.filter((utvonal) => utvonal.rendszam === car.rendszam);

          return {
            ...car,
            utvonalak: matchingUtvonalak,
          };
        });

        // Beállítom az állapotot
        setCarData(mergedData);
      } catch (error) {
        console.error('Hiba történt az adatok lekérésekor:', error);
      }
    };

    
    fetchData();
  }, []); 
  // Fogyasztás és megtett kilométerek számolása
  const calculateFuelConsumption = (utvonalak) => {
    let totalCarKm = 0;
    let totalCarFuel = 0;
  
    utvonalak.forEach((utvonal) => {
    totalCarKm += parseInt(utvonal.km);
    const fuelConsumption = utvonal.fogyasztas.replace(/,/, '.');
      console.log(fuelConsumption);
      totalCarFuel += totalCarKm / 100 * fuelConsumption;


    });


    return { totalCarKm, totalCarFuel};
  }; 

  return (
    <div>
      <h2>Autók adatai</h2>
      <ul>
        {carData.map((car, index) => (
          <li key={index}>
            <p>Rendszám: {car.rendszam}</p>
            <p>Marka: {car.marka}</p>
            <p>Fogyasztás: {car.fogyasztas}</p>

            {/* Fogyasztás és megtett kilométerek számolása */}
            {car.utvonalak && car.utvonalak.length > 0 && (
              <div>
              <p>Összes megtett kilométer: {calculateFuelConsumption(car.utvonalak).totalCarKm}</p>
              <p>Elhasznált üzemanyag: {calculateFuelConsumption(car.utvonalak).totalCarFuel}</p>
            </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayCarData;
