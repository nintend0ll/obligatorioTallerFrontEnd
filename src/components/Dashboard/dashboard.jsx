import { useEffect, useState } from "react";
import Header from "./Header/Header";
import { getRegistros } from "../../services/api";
import RegistroActividad from "./RegistroActividades/RegistroActividad";

import { useSelector, useDispatch } from "react-redux";
import {setRegistros} from "../../app/slices/userSlice";
import ActivityList from"./ListadoActividades/ActivityList";



const Dashboard = () => { 

    const userData = useSelector((state) => state.userSlice.userData);
    const dispatch = useDispatch();
    const [loading, setLoading]=useState(true);
    const[error, setError] = useState(null);


    useEffect(() => {
        const fetchData=  async ()=> {
            if (userData) {
                const {id, apikey} = userData;
                try{
                    const response = await getRegistros(id, apikey);
                    if(response.codigo===200){
                        dispatch(setRegistros(response.registros));
                    }else{
                        setError("Ha ocurrido un error");
                    }
                }catch(error){
                    setError("Error al cargar los registros: "+ error);
                }finally{
                    setLoading(false);
                }
            }
        }
        fetchData();
    }, [userData, dispatch]);

    if(loading){
        return <div>Cargando registros...</div>
    }
    if(error){
        return <div>{error}</div>
    }


    return (
    <div className="container-fluid">
        <Header  />
        <RegistroActividad></RegistroActividad>
        <ActivityList/>
        
    </div>
    );

 };

 export default Dashboard;