import BackToHome from "../Components/BackToHome";
import React, { useEffect, useState, Fragment } from 'react';
import { dataRef } from "../Components/FirebaseConfig";
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

export default function UserInput() {
 //Létrehotzom az adatstruktúrát =>
 const dataTable = "AzAdattáblaNeve"; 
 const dataKey = "docADAT6"; // Az adattáblán belül az első mező ennek mindim más név kell, hogy
 //újat hozzon létre. különben a meglévőt írja felül
 const dataS = { //a dataKey-be kerülő strukturált adatok
     user: {firstName: "Lajsoma", lastname: "Gezasa"},
     names: "Bélsaa",
     numb: 312,
     timestamp: serverTimestamp(),
     time: new Date().toLocaleString(),
 }

   const [name,setName]=useState('');

   const handleAdd=()=>{
       if(name!==""){
       dataRef.ref().child(dataTable).child(dataKey).set(dataS); 
       console.log(name);
       setName("");
       }  
     }
   
     const [dataKeys, setDataKeys] = useState([]); //dataKey-ek tárolásához kell
   
   const [data, setData] = useState(null);
   useEffect(() => {
     const fetchData = async () => {
     const snapshot = await dataRef.ref().child(dataTable).child(dataKey).once('value');
     const fetchedData = snapshot.val();
     setData(fetchedData);

      };
       fetchData();

       const fetchDataKeys = async () => {
         const snapshot = await dataRef.ref().child(dataTable).once('value');
         const keys = Object.keys(snapshot.val() || {}); // Ha nincs adat, akkor üres objektum, tehát itt kezeljük le
   
         setDataKeys(keys);
       };
   
       fetchDataKeys();
    }, []); 
  
   
   return(
       <div>
        <BackToHome/>
               <input value={name} onChange={(e)=>{setName(e.target.value)}} />
               <button onClick={handleAdd}>Add</button>
               <div>
         {/* Itt a 'data' változót használom a felhasználónak történő megjelenítésre vagy további feldolgozásra */}
         {data && (
           <div>
             <h2>{data.user.firstName} {data.user.lastname}</h2>
             <p>Name: {data.names}</p>
             <p>Number: {data.numb}</p>
           </div>
         )}
       </div>
           <div>
             <h3>DataKeys for DataTable: {dataTable}</h3>
             <ul>
               {dataKeys.map((keyke, index) => (
                 <li key={index}>{keyke}</li>
               ))}
             </ul>
           </div>
       </div>
   );
}