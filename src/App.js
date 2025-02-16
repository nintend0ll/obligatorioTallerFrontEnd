import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/login';
import Register from './components/Register/Register'; // Importa el componente Register

function App() {
  return (
    <div>
      <Routes>
        {/* Redirige la ruta principal ("/") al Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Ruta para el Login */}
        <Route path="/login" element={<Login />} />
        {/* Ruta para el Registro */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;