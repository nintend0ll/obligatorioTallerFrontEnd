import { useDispatch } from "react-redux";
import {onDeleteActivity} from "../../../../../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { deleteActivity } from "../../../../../../services/api";


const ActivityRow =({id,img, nombre, tiempo, fecha})=>{
    const dispatcher = useDispatch();
    
    const _onDeleteActivity=async()=>{
        const response = await deleteActivity(id);
        console.log("Eliminando actividad: "+ id);
        dispatcher(onDeleteActivity(response));
    };


    return(
        <tr>
            <td>{img}</td>
            <td>{nombre}</td>
            <td>{tiempo}</td>
            <td>{fecha}</td>
            <td>
                <button className="btn btn-danger" onClick={_onDeleteActivity}>
                Delete
                </button>
            </td>
        </tr>
    );
};
export default ActivityRow;