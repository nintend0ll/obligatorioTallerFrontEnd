import Button from "../../UI/Button/Button";

const Header = ({onLogout}) => {
    return (
        <header className="row">
        <div className="col-12 d-flex justify-content-between align-items-center my-3">
          <div className="d-flex align-items-center">
            <h1>Bienvenido</h1>
          </div>
          <div>
            <Button
              cta={"Logout"}
              type={"submit"}
              classColor={"btn-light"}
              onHandleClick={onLogout}
            />
          </div>
        </div>
      </header>
    );
};

export default Header;