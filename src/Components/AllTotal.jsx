import { useEffect, useState } from 'react';
import { dataRef } from "./FirebaseConfig";

const AllTotal = () => {
    //inicializálom az állapotokat az eredmények összesítéséhez
    const [totalKm, setTotalKm] = useState(0);
    const [totalConsumption, setTotalConsumption] = useState(0);
  
    useEffect(() => {
      // Jarmuvek collection elérése
      const jarmuvekCollection = dataRef.collection('jarmuvek');
  
      // Az összes dokumentum lekérdezése
      jarmuvekCollection.get()
        .then((querySnapshot) => {
          let totalKmSum = 0;
          let totalConsumptionSum = 0;
  
          // Minden dokumentumon végigmegyünk
          querySnapshot.forEach((doc) => {
            // Adatok kiolvasása a dokumentumból
            const { km, fogyasztas } = doc.data();
  
            // Az összesített értékek frissítése
            totalKmSum += km;
            totalConsumptionSum += km * fogyasztas;
          });
  
          // Az állapotok frissítése
          setTotalKm(totalKmSum);
          setTotalConsumption(totalConsumptionSum);
        })
        .catch((error) => {
          console.error("Ooops! Valaimi hiba történt");
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
  

