import React from "react";
import '../App.css';


export default function Home() {
    return (
        <div className="home">
            <div className="header">
                    <h1 className="title">Útvonal Nyílvántartó</h1>
                    <p>Válasz az alábbi lehetőségek közül!</p>
                </div>
            <div className="box-container">
                <div className="box">
                    <h2>Új útvonal adatok megadása</h2>
                    <button className='default-button' onClick={() => window.location = "/userinputs"}>Tovább</button>
                </div>
                <div className="box">
                    <h2>Meglévő adatok lekérdezése</h2>
                <button className='default-button' onClick={() => window.location = "/listvehicles"}>Tovább</button>
                </div>
                <div className="box">
                    <h2>Jármű Hozzáadása</h2>
                <button className='default-button' onClick={() => window.location = "/addcar"}>Tovább</button>
                </div>
            </div>
        </div>
    )
};