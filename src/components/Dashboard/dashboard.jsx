import { useEffect, useState } from "react";
import Header from "./Header/Header.jsx";
import { getRegistros } from "../../services/api.js";
import { useSelector, useDispatch } from "react-redux";
import { setRegistros } from "../../app/slices/userSlice.js";
import Main from "./Main/Main.jsx";
import madoka from "../../assets/madoka.gif";


const Dashboard = () => {
  const userData = useSelector((state) => state.userSlice.userData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [extraLoading, setExtraLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      if (userData) {
        const { id, apikey } = userData;
        try {
          const response = await getRegistros(id, apikey);
          if (response.codigo === 200) {
            dispatch(setRegistros(response.registros));
          } else {
            setError("Ha ocurrido un error");
          }
        } catch (error) {
          setError("Error al cargar los registros: " + error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();

    // simulamos tiempo extra para apreciar el gif de Madoka Magica
    const timer = setTimeout(() => {
      setExtraLoading(false);
    }, 4000); // Cambia el tiempo si lo deseas

    return () => clearTimeout(timer); 
  }, [userData, dispatch]);

  if (loading || extraLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <img src={madoka} alt="Cargando..." width="200" />
        <h3>Cargando registros...</h3>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container-fluid" style={{ marginTop: "80px" }}>
      <Header />
      <Main />
    </div>
  );
};

export default Dashboard;