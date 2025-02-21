import Button from "../../UI/Button/Button";
import "./Header.css";
import { useDispatch } from "react-redux";
import { onLogout } from "../../../app/slices/userSlice";

const Header = () => {
  const dispatcher = useDispatch();
    return (
      <header className="header">
      <div className="container-fluid">
          <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                      <h1>Bienvenido</h1>
                  </div>
                  <div className="ms-auto"> {/* Empuja el botón a la derecha */}
                      <Button
                          cta={"Logout"}
                          type={"submit"}
                          classColor={"btn-light"}
                          onHandleClick={() => dispatcher(onLogout())}
                      />
                  </div>
              </div>
          </div>
      </div>
  </header>
    );
};

export default Header;