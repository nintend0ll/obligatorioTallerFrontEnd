import React from 'react';
import { useEffect, useRef, useState } from "react";
//import '../../Styles/commonStyles.css'; // Importa estilos comunes
import '../Register/Register.css'; // Importa estilos específicos
import { Link } from 'react-router-dom'; // Importa Link
import { login } from '../../services/api';
import { register } from '../../services/api';
import {getCountries} from'../../services/api';
const Registro = () => {
  const inputUserNameRef = useRef();
  const inputPassRef = useRef();
  const inputCountryRef = useRef();


  const [btnDisabled, setBtnDisabled]=useState(true);
  const [btnText, setBtnText] = useState("Registrar usuario");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage]= useState("");

  const [countries, setCountries] = useState([]);

  useEffect(()=>{
    const fetchCountries = async()=>{
    try{
      const countryData = await getCountries();
      setCountries(countryData);
    }catch(error){
      setAlertMessage("error al cargar los paises");
    }
  };
  fetchCountries();
},[]);

  const _onHandleClick = async()=>{
    try{
      setBtnDisabled(true);
      setBtnText("Enviando datos....");
      const response = await register(
        inputUserNameRef.current.value,
        inputPassRef.current.value,
        inputCountryRef.current.value
      );

      setAlertMessage("Inicio de sesion correcto");
      setShowAlert(true);

    } catch(error){
      setAlertMessage(error);
      setShowAlert(true);
    }finally{
      setBtnDisabled(false);
      setBtnText("Registrar usuario");
    }
  };

  const _onHandleChange = () => {
    if (
      inputUserNameRef.current.value.length > 0 &&
      inputPassRef.current.value.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };


  return (
    <div className="container" id="Registro">
      <div>
        <h2>Regístrate</h2>
        <form>
          <div className="form-group">
            <label htmlFor="nombreUsuario">Usuario:</label>
            <input type="text" 
            id="nombreUsuarioRegis" 
            className="from-control"
            placeholder='Juan Perez'
            ref={inputUserNameRef}
            onChange={_onHandleChange}
             required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" 
            id="passwordRegis" 
            className="password" 
            ref={inputPassRef}
            onChange={_onHandleChange}
            required />
          </div>
          <div className="form-group">
            <label htmlFor="pais">Pais de residencia:</label>
            <select id="paises" 
            className="pais" 
            ref={inputCountryRef}
            onChange={_onHandleChange}
            required>
            <option value="">Selecciona un pais</option>
            {countries.map((country)=>(
              <option key = {country.id} value={country.id}>
                {country.name}
              </option>
            ))}
            </select>
          </div>
          <div className="form-group">
            <button type="submit">Crear Cuenta</button>
          </div>
        </form>
        <div className="registro-link">
          <p>¿Ya tienes una cuenta? <Link to="/Login" id="mostrarRegistro">Inicia sesión aquí</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Registro;