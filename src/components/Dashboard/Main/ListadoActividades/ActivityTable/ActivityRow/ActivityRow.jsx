import { useDispatch } from "react-redux";
import { deleteActivity, getRegistros } from "../../../../../../services/api";
import { getUserDataFromLocalStorage } from "../../../../../../utils/utils";
import { setRegistros } from "../../../../../../app/slices/userSlice";

const IMAGEN_BASE_URL = "https://movetrack.develotion.com/imgs/"

const ActivityRow = ({ id, imagen, nombre, tiempo, fecha }) => {
    const dispatch = useDispatch();
    const imageUrl = `${IMAGEN_BASE_URL}${imagen}.png`;

    const _onDeleteActivity = async () => {

        const userData = getUserDataFromLocalStorage();
        if (!userData) return;
        const response = await deleteActivity(id);

        if (response.codigo !== 200) {
            throw new Error("Error al borrar actividad");
        }

        const responseRegistros = await getRegistros(userData.id, userData.apiKey);

        dispatch(setRegistros(responseRegistros.registros));// Agrego los registros sin el elemento borrado
    };


    return (
        <tr>
            <td><img src={imageUrl} alt="icon" /></td>
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

