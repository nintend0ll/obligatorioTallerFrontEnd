import Button from "../../UI/Button/Button";
import "./Header.css";
import { useDispatch } from "react-redux";
import { onLogout } from "../../../app/slices/userSlice";

const Header = () => {
  const dispatcher = useDispatch();
  const usuario = localStorage.getItem("usuario"); // Recuperamos el usuario para mostrarlo en el header
  return (
    <header className="header">
      <div className="header-container">
        <h1>Bienvenida {usuario ? usuario : "Usuario"} a Pretty Strong </h1>
        <div className="ms-auto">
          <Button
            cta={"Logout"}
            type={"submit"}
            classColor={"btn-light"}
            onHandleClick={() => dispatcher(onLogout())}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
