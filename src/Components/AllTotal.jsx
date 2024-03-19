import { useEffect, useState } from 'react';
import db from './FireStoreDb';

const AllTotal = () => {
    // Inicializálom az állapotokat az eredmények összesítéséhez
    const [totalKm, setTotalKm] = useState('');
    const [totalConsumption, setTotalConsumption] = useState('');
  
    useEffect(() => {
      // Jarmuvek collection elérése a Realtime Database-ben
      const jarmuvekRef = db.collection('utvonalak');
  
      // Az összes dokumentum lekérdezése
      jarmuvekRef.get()
        .then((querySnapshot)  => {
          let totalKmSum = 0;
          let totalConsumptionSum = 0;
  
          // Minden dokumentumon végigmegyünk
          querySnapshot.forEach((doc) => {
            // Adatok kiolvasása a dokumentumból
            const { km, fogyasztas } = doc.data();
            //Adatokat számértékké alakítom
            let formatedKm = parseInt(km);
            let formatedFogyasztas = parseFloat(fogyasztas);
            // Az összesített értékeket frissítem
            totalKmSum += formatedKm;
            totalConsumptionSum += km * formatedFogyasztas  / 100;
           
          });
  
          // Az állapotokat frissítem csak egyszer, a cikluson kívül
          setTotalKm(totalKmSum);
          setTotalConsumption(totalConsumptionSum.toFixed(2));
        })
        .catch((error) => {
          console.error("Ooops! Valami hiba történt", error);
        });
    }, []);
  

  return (
    <div className='box'>
      <h1>Összes megtett km: {totalKm} km</h1>
      <h2>Összes elhasznált üzemanyag: {totalConsumption} liter</h2>
    </div>
  );
};

export default AllTotal;