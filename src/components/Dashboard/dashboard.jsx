import { useEffect, useState } from "react";
import Header from "./Header/Header";
import { getRegistros } from "../../services/api";
import RegistroActividad from "./RegistroActividades/RegistroActividad";

const Dashboard = ({userData, onLogout}) => { 

    const [registros, setRegistros] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (userData) {
                const {id} = userData;
                const {apikey} = userData;
                const response = await getRegistros(id, apikey);
                setRegistros(response);
            }
        }
        fetchData();
    }, []);



    return (
    <div className="container-fluid">
        <Header onLogout={onLogout} />
        <RegistroActividad></RegistroActividad>
    </div>
    );

 };

 export default Dashboard;