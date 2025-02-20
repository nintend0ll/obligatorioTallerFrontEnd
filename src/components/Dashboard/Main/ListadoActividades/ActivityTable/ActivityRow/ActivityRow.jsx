import { useDispatch } from "react-redux";
import {onDeleteActivity} from "../../../../../../app/slices/userSlice";

const ActivityRow =({img, nombre, tiempo, fecha})=>{
    const disptcher = useDispatch();
    const _onDeleteActivity=()=>{
        disptcher(onDeleteActivity(nombre));
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