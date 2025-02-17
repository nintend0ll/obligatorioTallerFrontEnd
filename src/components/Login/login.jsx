import { Link } from 'react-router-dom'; // Importa Link
import { useEffect, useRef, useState } from 'react'; // Importa useEffect, useRef, useState
import "./Login.css";
import {useNavigate} from 'react-router-dom'; // Importa useNavigate
import { login } from "../../services/api";
import Alert from "../UI/Alert/Alert";


const Login =({onLogin, userData}) =>{

  const inputUsernameRef = useRef();
  const inputPasswordRef = useRef();
  const navigateTo = useNavigate(); // Utiliza useNavigate para navegar entre rutas

  const [btnDisabled, setBtnDisabled] = useState(true); // Estado para el botón de login
  const [btnText, setBtnText] = useState('Login'); // Estado para el texto del botón de login
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar un mensaje de alerta
  const [alertMessage, setAlertMessage] = useState(''); // Estado para el mensaje de alerta
  const [classMessage, setClassMessage] = useState(''); // Estado para la clase del mensaje de alerta

  useEffect(() => {
    if (userData) { 
      navigateTo('/dashboard'); 
     }
  }, [userData]);

  const _onHandleClick = async () => {
    try {
      setBtnDisabled(true);
      setBtnText("Enviando ...");
      const response = await login(
        inputUsernameRef.current.value,
        inputPasswordRef.current.value
      );

      setClassMessage("alert-success");
      setAlertMessage("Inicio de sesion correcto");
      setShowAlert(true);

      setTimeout(() => {
        onLogin(response);
      }, 2000);
    } catch (error) {
      setClassMessage("alert-danger");
      setAlertMessage(error);
      setShowAlert(true);
    } finally {
      setBtnDisabled(false);
      setBtnText("Iniciar sesión");
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
        <div className="container" id="Login">
        <div>
          <h2>Iniciar sesión</h2>
          <form>
        {showAlert ? (
          <Alert classColor={classMessage} message={alertMessage} />
        ) : (
          ""
        )}
        <div className="form-group">
          <label htmlFor="usuario">Usuario</label>
          <div className="input-group">
            
            <input
              className="form-control"
              id="usuario"
              placeholder="usuario"
              ref={inputUsernameRef}
              onChange={_onHandleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-group">
            
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              ref={inputPasswordRef}
              onChange={_onHandleChange}
            />
           
          </div>
        </div>
        <button
          type="submit"
          className={`btn btn-primary btn-block`}
          onClick={_onHandleClick}
          disabled={btnDisabled}
        >
          {btnText}
        </button>

      </form>
          {/* Enlace para mostrar el registro */}
          <div className="registro-link">
             <p>¿No tienes una cuenta?  
                <Link to="/Register" id="mostrarRegistro"> Regístrate aquí</Link></p>
            </div>
        </div>
      </div>
    
    );
};
export default Login;