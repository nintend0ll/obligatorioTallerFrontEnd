import { useEffect, useRef, useState } from 'react'; // Importa useEffect, useRef, useState
import Alert from "../../../UI/Alert/Alert";
import { getActividades, saveActividad } from '../../../../services/api';
import Button from "../../../UI/Button/Button";
import { getUserDataFromLocalStorage } from "../../../../utils/utils";
import { onAddActividad } from "../../../../app/slices/userSlice";
import { useDispatch } from 'react-redux';


const RegistroActividad = ({ onToggleModal })=>{
    const actividadRef = useRef();
    const duracionRef = useRef();
    const fechaRef = useRef();

    const dispatch = useDispatch();

    const [options, setOptions] = useState([]);
    const [selectedOpcion, setSelectedOption] = useState('');   
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [showAlert, setShowAlert] = useState(false); // Estado para mostrar un mensaje de alerta
    const [alertMessage, setAlertMessage] = useState('');
    const [classMessage, setClassMessage] = useState(''); // Estado para la clase del mensaje de alerta

    useEffect(() => {
      const fetchActivities = async () => {
        try {
          const response = await getActividades();
          if(response.codigo === 200) {
            setOptions(response.actividades);
          }else{
            showAlert(true);
            setAlertMessage("Error al cargar las actividades");
            setClassMessage("danger");
          }
        } catch (error) {
          showAlert(true);
          setAlertMessage("Error al cargar las actividades" + error);
          setClassMessage("danger");
        }
      };
      fetchActivities();
    },[]);

      const handleSelectChange = (event)=>{
        setSelectedOption(event.target.value);
      };

      const _onHandleClick = async () => {
        console.log('entro')
        try{
          const respuesta = await 
          saveActividad
          (actividadRef.current.value, duracionRef.current.value, fechaRef.current.value);
        console.log(respuesta)
        setAlertMessage(respuesta.mensaje)
        console.log(respuesta.mensaje)
        } catch(error){
          setAlertMessage(error.message);
        }
       
      }

    
      return (
        <div className="container">
          <h2>Registrar actividad</h2>
          <form>
            {showAlert && <Alert classColor={classMessage} message={alertMessage} />}
            <div className="form-group">
              <label htmlFor="actividad">Actividad</label>
              <select
                    id="actividad"
                    //value = {selectedOpcion}
                    ref={actividadRef}
                    onChange={handleSelectChange}
                    className='form-control'
                    >
                        <option value="">Selecciona una actividad</option>
                        {options.map(option =>(
                            <option key={option.id} value={option.id}>
                                {option.nombre}
                            </option>
                        ))}
                    </select>
            </div>
            <div className="form-group">
              <label htmlFor="duracion">Duración (minutos)</label>
              <input type="number" id="duracion" ref={duracionRef} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="fecha">Fecha</label>
              <input type="date" id="fecha" ref={fechaRef} className="form-control" />
            </div>
            <Button
              type="button"
              classColor="btn btn-primary"
              cta="Registrar actividad"
              onHandleClick={_onHandleClick}
            />
          </form>
        </div>
      );
    };


   
export default RegistroActividad;