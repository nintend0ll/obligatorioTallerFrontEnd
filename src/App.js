import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import {useEffect, useState} from "react"; 
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Register from './components/Register/Register'; // Importa el componente Register
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario

  useEffect(() => {
    const localData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null;
    setUserData(localData);
  }, []);

  const _onLogin = (loginData) => { 
    setUserData(loginData);
    localStorage.setItem("userData", JSON.stringify(loginData));
  };
  
  const _onLogout = () =>{
    localStorage.removeItem("userData");
    setUserData("null");
  };
  
  return (
    <div className='App'>
      <Routes>
        {/* Redirige la ruta principal ("/") al Login */}
        <Route path="/" element={<Login onLogin={_onLogin} />} />
        {/* Ruta para el Login */}
        <Route path="/Login" element={<Login onLogin={_onLogin} userData={userData} />} />
        {/* Ruta para el Registro */}
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={
          <PrivateRoute userData={userData}>
              <Dashboard userData={userData} onLogout={_onLogout} />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;