import { useEffect, useState } from 'react';
import { dataRef } from "./FirebaseConfig";

const AllTotal = () => {
    // Inicializálom az állapotokat az eredmények összesítéséhez
    const [totalKm, setTotalKm] = useState('');
    const [totalConsumption, setTotalConsumption] = useState('');
  
    useEffect(() => {
      // Jarmuvek collection elérése a Realtime Database-ben
      const jarmuvekRef = dataRef.ref('utvonalak');
  
      // Az összes dokumentum lekérdezése
      jarmuvekRef.once('value')
        .then((snapshot) => {
          let totalKmSum = 0;
          let totalConsumptionSum = 0;
  
          // Minden dokumentumon végigmegyünk
          snapshot.forEach((childSnapshot) => {
            // Adatok kiolvasása a dokumentumból
            const { km, fogyasztas } = childSnapshot.val();
          
            // Az összesített értékeket frissítem
            totalKmSum += km * 1;
            let formatedFogyasztas = fogyasztas.replace(/,/, '.');
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
    <div>
      <p>Total KM: {totalKm}</p>
      <p>Total Consumption: {totalConsumption}</p>
    </div>
  );
};

export default AllTotal;