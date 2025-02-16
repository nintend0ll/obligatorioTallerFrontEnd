import { Link } from 'react-router-dom'; // Importa Link

//import '../../Styles/commonStyles.css'; // Importa estilos comunes

const Login =() =>{


  
    return (
        <div className="container" id="Login">
        <div>
          <h2>Iniciar sesión</h2>
          <form action="#" method="post">
            <div className="form-group">
              <label htmlFor="nombreUsuario">Usuario:</label>
              <input type="text" id="nombreUsuarioLogin" name="nombreUsuarioLogin" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="passwordLogin" name="passwordLogin" required />
            </div>
            <div className="form-group">
              <button type="submit">Iniciar sesión</button>
            </div>
          </form>
          {/* Enlace para mostrar el registro */}
          <div className="registro-link">
             <p>¿No tienes una cuenta? 
                <Link to="/Register" id="mostrarRegistro">Regístrate aquí</Link></p>
            </div>
        </div>
      </div>
    
    );
};
export default Login;