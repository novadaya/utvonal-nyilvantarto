import { useEffect, useState } from 'react';
import { dataRef } from "../Components/FirebaseConfig";
// ...

const DisplayCarData = () => {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lekérjük az összes autót az adatbázisból
        const carsSnapshot = await dataRef.ref().child("jarmuvek").once('value');
        const carsData = [];

        carsSnapshot.forEach((carSnapshot) => {
          const car = carSnapshot.val();
          carsData.push(car);
        });

        // Lekérjük az összes útvonalat az adatbázisból
        const utvonalakSnapshot = await dataRef.ref().child("utvonalak").once('value');
        const utvonalakData = [];

        utvonalakSnapshot.forEach((utvonalSnapshot) => {
          const utvonal = utvonalSnapshot.val();
          utvonalakData.push(utvonal);
        });

        // Az autók és útvonalak összefűzése rendszám alapján
        const mergedData = carsData.map((car) => {
          const matchingUtvonalak = utvonalakData.filter((utvonal) => utvonal.rendszam === car.rendszam);

          return {
            ...car,
            utvonalak: matchingUtvonalak,
          };
        });

        // Beállítjuk az állapotot az összes autóval
        setCarData(mergedData);
      } catch (error) {
        console.error('Hiba történt az adatok lekérésekor:', error);
      }
    };

    // Lekérjük az adatokat a komponens mountolásakor
    fetchData();
  }, []); // Az üres dependency array azt jelenti, hogy a useEffect csak egyszer fut le, a komponens mountolásakor

 
  // Fogyasztás és megtett kilométerek számolása
  const calculateFuelConsumption = (utvonalak) => {
    let totalKm = 0;
    let totalFuel = 0;
  
    utvonalak.forEach((utvonal) => {
      totalKm += parseInt(utvonal.km, 10) || 0;
  
      // Ellenőrizd, hogy az autó fogyasztása létezik-e, mielőtt hozzáférnél hozzá
      if (utvonal.car && utvonal.car.fogyasztas) {
        //!!!!!!!!!!!!!!itt nem kapja meg a fogyasztas adatot !!!!!!!!
        const fuelConsumption = (parseFloat(utvonal.car.fogyasztas) || 0) / 100;
        totalFuel += totalKm * fuelConsumption;
      }
    });
  
    return { totalKm, totalFuel };
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
              <p>Összes megtett kilométer: {calculateFuelConsumption(car.utvonalak).totalKm}</p>
              <p>Elhasznált üzemanyag: {calculateFuelConsumption(car.utvonalak).totalFuel}</p>
            </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayCarData;
