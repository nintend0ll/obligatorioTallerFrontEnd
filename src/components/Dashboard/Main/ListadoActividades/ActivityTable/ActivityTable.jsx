import { useSelector } from "react-redux";
import ActivityRow from "./ActivityRow/ActivityRow";
import ActivityFilter from "./ActivityFilter/ActivityFilter";
import { useState, useEffect } from "react";
import { getActividades } from "../../../../../services/api";
const IMAGEN_BASE_URL = "https://movetrack.develotion.com/imgs/";

const ActivityTable = ()=>{
    const activities = useSelector((state)=>state.userSlice.registros);
    const [filter, setFilter]=useState("all");
    const [actividadesCompletas, setActividadesCompletas] = useState([]);

    const setActivityTypes = (userActivities, activityTypes) => {
        // Retornamos el array enriquecido directamente
        return userActivities.map(activity => {
          // Buscamos el tipo que coincida con el idActividad del registro
          const matchingType = activityTypes.find(tipo => tipo.id === activity.idActividad);
          // Si lo encontramos, lo agregamos al objeto de actividad
          return matchingType
            ? {
                ...activity,
                // Sobreescribimos o agregamos las propiedades de nombre e imagen del tipo
                nombre: matchingType.nombre,
                imagen: matchingType.imagen,
              }
            : activity;
        });
      };
    useEffect(() => {
        async function fetchActivityTypes() {
            const data = await getActividades();
            const enrichedActivities = setActivityTypes(activities, data.actividades);
            setActividadesCompletas(enrichedActivities);    
               }
        fetchActivityTypes();
      }, []);

    const handleFilterChange=(selectedFilter)=>{
        setFilter(selectedFilter);
    }


    const filterActivities =()=>{
        const now = new Date();
        return actividadesCompletas.filter((activity)=>{
            const activityDate = new Date(activity.fecha);

            if(filter==="week"){
                const lastWeek=new Date();
                lastWeek.setDate(now.getDate()-7);
                return activityDate>=lastWeek;
            }else if(filter==="month"){
                const lastMonth=new Date();
                lastMonth.setDate(now.getMonth()-1)
                return activityDate>=lastMonth;
            }
            return true;//porque all es el que es x default
        });
    };

    return(
        <div class="table-container">
        <div className="filter-wrapper">
            <ActivityFilter onFilterChange={handleFilterChange} />
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                
                    <th>#</th>
                    <th>Actividad</th>
                    <th>Tiempo</th>
                    <th>Fecha</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {filterActivities().map((actividadesCompletas)=>(
                    <ActivityRow
                        id={actividadesCompletas.id}
                        imagen={actividadesCompletas.imagen}
                        nombre ={actividadesCompletas.nombre}
                        tiempo ={actividadesCompletas.tiempo}
                        fecha={actividadesCompletas.fecha}
                    />
                ))}
            </tbody>
        </table>
        </div>
    );
};
export default ActivityTable;