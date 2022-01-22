import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Lupa from '../../assets/lupa.png';
import Flecha from '../../assets/flecha.png';
import Carro from '../../assets/UberX.png';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../../assets/profile_iconRecurso 6.svg';
import Link from '@mui/material/Link';
import Maps from '../Maps/Maps';


const Home: React.FC = () => {

    function newViaje(){
        console.log("Iniciar");
    }

    return (
        <Box
            sx={{
                width: '98.9vw',
                height: '90vh',
                overflow: 'hidden'
            }}
        >
            <Maps/>
        </Box>
    );
}

export default Home;
