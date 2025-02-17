import React from 'react';
import { useEffect, useRef, useState } from "react";
import '../Register/Register.css'; 
import { Link } from 'react-router-dom'; // Importa Link
import { register } from '../../services/api';
import {getCountries} from'../../services/api';
import Alert from "../UI/Alert/Alert"; // Importa componente Alert


const Register = () => {

  const inputUsernameRef = useRef();
  const inputPasswordRef = useRef();
  const inputCountryRef = useRef();


  const [btnDisabled, setBtnDisabled]=useState(true);
  const [btnText, setBtnText] = useState("Registrar usuario");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage]= useState("");
  const [classMessage, setClassMessage] = useState('');

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
        inputUsernameRef.current.value,
        inputPasswordRef.current.value,
        inputCountryRef.current.value
      );
      setClassMessage("alert-success");
      setAlertMessage("Inicio de sesion correcto");
      setShowAlert(true);

    } catch(error){
      setClassMessage("alert-danger");
      setAlertMessage(error);
      setShowAlert(true);
    }finally{
      setBtnDisabled(false);
      setBtnText("Registrar usuario");
    }
  };

  const _onHandleChange = () => {
    if (
      inputUsernameRef.current.value.length > 0 &&
      inputPasswordRef.current.value.length > 0
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
        {showAlert ? (
          <Alert classColor={classMessage} message={alertMessage} />
        ) : (
          ""
        )}
          <div className="form-group">
            <label htmlFor="nombreUsuario">Usuario</label>
            <input type="text" 
            id="nombreUsuarioRegis" 
            className="from-control"
            placeholder='usuario'
            ref={inputUsernameRef}
            onChange={_onHandleChange}
             required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" 
            id="passwordRegis" 
            className="password" 
            placeholder='password'
            ref={inputPasswordRef}
            onChange={_onHandleChange}
            required />
          </div>
          <div className="form-group">
            <label htmlFor="pais">Pais de residencia</label>
            <select id="paises" 
            className="pais" 
            ref={inputCountryRef}
            onChange={_onHandleChange}
            required>
            <option value="">Seleccionar pais</option>
            {countries.map((country)=>(
              <option key = {country.id} value={country.id}>
                {country.name}
              </option>
            ))}
            </select>
          </div>
          <div className="form-group">
          <button
          type="submit"
          className={`btn btn-primary btn-block`}
          onClick={_onHandleClick}
          disabled={btnDisabled}
        >
          {btnText}
        </button>
          </div>
        </form>
        <div className="registro-link">
          <p>¿Ya tienes una cuenta? <Link to="/Login" id="mostrarRegistro">Inicia sesión aquí</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;