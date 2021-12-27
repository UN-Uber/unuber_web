import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {ConfigureStore} from './redux/ConfigureStore'

const store =  ConfigureStore();

function App() {
  return(<h1>Hola mundo</h1>);
}

export default App;
