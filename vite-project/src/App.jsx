import React from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Login} from './Login.jsx';
import {Home} from './Home.jsx';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Register } from './Register.jsx';
import {Forgetpass} from './Forgetpass.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} ></Route>
        <Route path='register' element={<Register/>}></Route>
        <Route path='forgetpass' element={<Forgetpass/>}></Route>
        <Route path='home' element={<Home/>}></Route>
        <Route path='forgetpass/register' element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
