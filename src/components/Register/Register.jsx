import React from 'react';
//import '../../Styles/commonStyles.css'; // Importa estilos comunes
import '../Register/Register.css'; // Importa estilos específicos
import { Link } from 'react-router-dom'; // Importa Link
const Registro = () => {
  return (
    <div className="container" id="Registro">
      <div>
        <h2>Regístrate</h2>
        <form action="#" method="post">
          <div className="form-group">
            <label htmlFor="nombreUsuario">Usuario:</label>
            <input type="text" id="nombreUsuarioRegis" name="nombreUsuario" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="passwordRegis" name="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="pais">Pais de residencia:</label>
            <select id="paises" name="pais" required></select>
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