import { useSelector } from "react-redux";
import ActivityRow from "./ActivityRow/ActivityRow";


const ActivityTable = ()=>{
    const activities = useSelector((state)=>state.userSlice.registros);

    return(
        <div class="table-container">
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
                {activities.map((activity)=>(
                    <ActivityRow
                        key={activity.id}
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