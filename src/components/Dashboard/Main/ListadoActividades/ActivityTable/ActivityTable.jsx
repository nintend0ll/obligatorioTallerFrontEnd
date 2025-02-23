import { useSelector } from "react-redux";
import ActivityRow from "./ActivityRow/ActivityRow";
import ActivityFilter from "./ActivityFilter/ActivityFilter";
import { useState } from "react";

const ActivityTable = ()=>{
    const activities = useSelector((state)=>state.userSlice.registros);
    const [filter, setFilter]=useState("all");

    const handleFilterChange=(selectedFilter)=>{
        setFilter(selectedFilter);
    }


    const filterActivities =()=>{
        const now = new Date();
        return activities.filter((activity)=>{
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
        
        <div className="table-container">
        <ActivityFilter onFilterChange={handleFilterChange}/>
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
                {filterActivities().map((activity)=>(
                    <ActivityRow
                        key={activity.id}
                        id={activity.id}
                        actividad ={activity.nombre}
                        tiempo ={activity.tiempo}
                        fecha={activity.fecha}
                    />
                ))}
            </tbody>
        </table>
        </div>
    );
};
export default ActivityTable;