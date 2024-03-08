import BackToHome from "../Components/BackToHome";
import { useEffect, useState } from 'react';
import { dataRef } from "../Components/FirebaseConfig";
import AllTotal from "../Components/allTotal";


// ...

export default function DisplayUtvonalak() {
  const [utvonalak, setUtvonalak] = useState([]);
  const dataTable = "utvonalak"; 
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    // Lekérem az összes útvonalat az adatbázisból
    const fetchData = async () => {
      try {
        const snapshot = await dataRef.ref().child(dataTable).once('value');
        const utvonalakData = [];

        snapshot.forEach((childSnapshot) => {
          const utvonalData = childSnapshot.val();
          utvonalakData.push(utvonalData);
        });

        // Beállítom az állapotot az összes útvonalra
        setUtvonalak(utvonalakData);
      } catch (error) {
        console.error('Ooopsz! Valami hiba történt!', error);
      }
    };

    // Lekérem az autók adatait az adatbázisból
    fetchData();
    const fetchCarData = async () => {
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

    fetchCarData();
  }, []);


    return (
        <>
            <BackToHome/>
        <AllTotal/>
            <div>
                <h2>Autók listája</h2>
            <ul>
              {carList.map(car => (
                <li key={car.rendszam}>
                  Rendszám: {car.rendszam}, Márka: {car.marka}, Fogyasztás: {car.fogyasztas}
                </li>
              ))}
            </ul>
      <h2>Összes útvonal</h2>
      <ul>
        {utvonalak.map((utvonal, index) => (
          <li key={index}>
            <p>Dátum és idő: {utvonal.dateAndtime.date} {utvonal.dateAndtime.time}</p>
            <p>Honnan: {utvonal.honnan.telepules} {utvonal.honnan.utca} {utvonal.honnan.hazszam}</p>
            <p>Hova: {utvonal.hova.partner} {utvonal.hova.telepules} {utvonal.hova.utca} {utvonal.hova.hazszam}</p>
            <p>Kilométer: {utvonal.km}</p>
            <p>Rendszám: {utvonal.rendszam}</p>
          </li>
        ))}
      </ul>
    </div>
      </>
    );
}