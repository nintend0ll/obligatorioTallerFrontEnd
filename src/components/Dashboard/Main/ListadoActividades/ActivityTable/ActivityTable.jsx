import { useSelector } from "react-redux";
import ActivityRow from "./ActivityRow/ActivityRow";
import ActivityFilter from "./ActivityFilter/ActivityFilter";
import { useState, useEffect } from "react";
import { getActividades } from "../../../../../services/api";

const ActivityTable = () => {
    const registros = useSelector((state) => state.userSlice.registros);
    const [filter, setFilter] = useState("all");
    const [actividadesCompletas, setActividadesCompletas] = useState([]);

    // Hacemos un JOIN con los datos del tipo de actividad
    const setActivityTypes = (userActivities, activityTypes) => {
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
            const response = await getActividades();
            const enrichedRegistros = setActivityTypes(registros, response.actividades);
            setActividadesCompletas(enrichedRegistros);
        }
        fetchActivityTypes();
    }, [registros]);

    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
    }

    const filterRegistros = () => {
        const now = new Date();
        return actividadesCompletas.filter((activity) => {
            const activityDate = new Date(activity.fecha);

            if (filter === "week") {
                const lastWeek = new Date();
                lastWeek.setDate(now.getDate() - 7);
                return activityDate >= lastWeek;
            } else if (filter === "month") {
                const lastMonth = new Date();
                lastMonth.setMonth(now.getMonth() - 1);
                return activityDate >= lastMonth;
            }
            return true;//porque all es el que es x default
        });
    };

    return (
        <div className="activity-list-container">
            {/* Contenedor de filtros separado */}
            <div className="filter-wrapper">
                <ActivityFilter onFilterChange={handleFilterChange} />
            </div>

            {/* Contenedor de la tabla */}
            <div className="table-container">
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
                        {filterRegistros().map((actividadesCompletas) => (
                            <ActivityRow
                                key={actividadesCompletas.id}
                                id={actividadesCompletas.id}
                                imagen={actividadesCompletas.imagen}
                                nombre={actividadesCompletas.nombre}
                                tiempo={actividadesCompletas.tiempo}
                                fecha={actividadesCompletas.fecha}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ActivityTable;