import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import {useEffect, useState} from "react"; 
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Register from './components/Register/Register'; // Importa el componente Register
import Dashboard from './components/Dashboard/Dashboard';

function App() {


  useEffect(() => {
    const localData = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null;

    //setUserData(localData);
  }, []);
  
  const _onLogout = () => {};
  
  return (
    <div className='App'>
      <Routes>
        {/* Redirige la ruta principal ("/") al Login */}
        <Route path="/" element={<Login/>} />
        {/* Ruta para el Login */}
        <Route path="/Login" element={<Login />} />
        {/* Ruta para el Registro */}
        <Route path="/Register" element={<Register/>} />
        <Route path="/Dashboard" element={
          <PrivateRoute>
              <Dashboard />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;