import { useEffect, useState } from "react";
import Header from "./Header/Header";
import { getRegistros } from "../../services/api";
<<<<<<< HEAD
import RegistroActividad from "./RegistroActividades/RegistroActividad";
=======
import { useSelector, useDispatch } from "react-redux";
>>>>>>> 90655feee76cc6d499ca9e2e9769266042033956

const Dashboard = () => { 

    const userData = useSelector((state) => state.userSlice.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            if (userData) {
                const {id} = userData;
                const {apikey} = userData;
                const response = await getRegistros(id, apikey);
                dispatch(getRegistros(response));
            }
        }
        fetchData();
    }, []);



    return (
    <div className="container-fluid">
<<<<<<< HEAD
        <Header onLogout={onLogout} />
        <RegistroActividad></RegistroActividad>
=======
        <Header/>
>>>>>>> 90655feee76cc6d499ca9e2e9769266042033956
    </div>
    );

 };

 export default Dashboard;