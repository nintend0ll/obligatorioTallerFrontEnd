import { Link } from 'react-router-dom'; 
import { useEffect, useRef, useState } from 'react'; 
import './Login.css'; 
import { useNavigate } from 'react-router-dom'; 
import { login } from "../../services/api";
import Alert from "../UI/Alert/Alert";
import { useSelector, useDispatch } from "react-redux";
import { onLogin } from "../../app/slices/userSlice";


const Login = () => {

  const userData = useSelector((state) => state.userSlice.userData);
  const dispatch = useDispatch();

  const inputUsernameRef = useRef();
  const inputPasswordRef = useRef();
  const navigateTo = useNavigate(); 

  const [btnDisabled, setBtnDisabled] = useState(true); 
  const [btnText, setBtnText] = useState('Login'); 
  const [showAlert, setShowAlert] = useState(false); 
  const [alertMessage, setAlertMessage] = useState(''); 
  const [classMessage, setClassMessage] = useState(''); 

  useEffect(() => {
    if (userData != null) {
      navigateTo('/dashboard');
    }
  }, [userData, navigateTo]); 

  const _onHandleClick = async () => {
    try {
      setBtnDisabled(true);
      setBtnText("Enviando ...");

      const usuario = inputUsernameRef.current.value; //guardamos el nombre de usuario para mostrarlo en el header

      const response = await login(
        usuario,
        inputPasswordRef.current.value
      );

      localStorage.setItem("usuario", usuario); //aqui lo seteamos

      setClassMessage("alert-success");
      setAlertMessage("Inicio de sesion correcto");
      setShowAlert(true);

      setTimeout(() => {
        dispatch(onLogin(response));
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
        {}
        <div className="registro-link">
          <p>¿No tienes una cuenta?
            <Link to="/Register" id="mostrarRegistro"> Regístrate aquí</Link></p>
        </div>
      </div>
    </div>

  );
};
export default Login;