import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Lupa from '../../assets/lupa.png';
import Flecha from '../../assets/flecha.png';
import Carro from '../../assets/UberX.png';


const Home: React.FC = () => {

    function newViaje(){
        console.log("Iniciar");
    }

    return (
        <div id="registro">
            <h2 id="tituloR">Inicio del viaje</h2>
            
            <h3 id="subtitulo">Mapa</h3>

            {/*Incluir el mapa en este div*/}
            <div id="mapa">
                


            </div>
            
            <h3 id="subtitulo">Destino</h3>
            
            <div id="destino">
                <img className="ima" src={Lupa}/>
                <input type="text" name="name" />
                <img className="ima" src={Flecha}/>
            </div>
            
            <h3 id="subtitulo">Tipo de Transporte</h3>
            
            {/*Incertar los vehiculos falta desarrollar*/}
            <div id="vehiculos">
                <div id="vehiculo">
                    <button onClick={newViaje} className="btn btn-succes" id="botonx">
                        <img className="imav" src={Carro}/>
                    </button>
                    <h5>Costo</h5>
                    <h5>Tipo</h5>
                    <h5>Viaje</h5>
                </div>
                <div id="vehiculo">
                    <button onClick={newViaje} className="btn btn-succes" id="botonx">
                        <img className="imav" src={Carro}/>
                    </button>
                    <h5>Costo</h5>
                    <h5>Tipo</h5>
                    <h5>Viaje</h5>
                </div>
                <div id="vehiculo">
                    <button onClick={newViaje} className="btn btn-succes" id="botonx">
                        <img className="imav" src={Carro}/>
                    </button>
                    <h5>Costo</h5>
                    <h5>Tipo</h5>
                    <h5>Viaje</h5>
                </div>
                <div id="vehiculo">
                    <button onClick={newViaje} className="btn btn-succes" id="botonx">
                        <img className="imav" src={Carro}/>
                    </button>
                    <h5>Costo</h5>
                    <h5>Tipo</h5>
                    <h5>Viaje</h5>
                </div>
            </div>

            <button onClick={newViaje} className="btn btn-succes" id="botonx">
                Iniciar viaje
            </button>
        </div>
    )
}

export default Home;
