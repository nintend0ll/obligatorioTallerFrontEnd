import React, { useEffect } from 'react'; // Add useEffect import
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login'; // Ensure case matches
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Register from './components/Register/Register'; 
import Dashboard from './components/Dashboard/Dashboard'; // Ensure case matches
import { onAutoLogin } from './app/slices/userSlice';
import { useDispatch } from 'react-redux'; // Add useDispatch import

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const localData = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null;
      if (localData != null) { 
        dispatch(onAutoLogin(localData));
      }
  }, []);
  
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Login" element={<Login />} />
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