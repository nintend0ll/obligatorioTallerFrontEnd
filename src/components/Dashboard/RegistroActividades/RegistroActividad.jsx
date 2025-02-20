import { useEffect, useRef, useState } from 'react'; // Importa useEffect, useRef, useState
import Alert from "../../UI/Alert/Alert";
import { saveActividad } from '../../../services/api';
import Button from "../../UI/Button/Button";
import { getUserDataFromLocalStorage } from "../../../utils/utils";
import { onAddActividad } from "../../../app/slices/userSlice";
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

    const _onHandleClick = async () => {
        const idActividad = actividadRef.current.value;
        const tiempo = duracionRef.current.value;
        const fecha = fechaRef.current.value;

    
        if (idActividad && tiempo && fecha) {
          const userData = getUserDataFromLocalStorage();
    
          if (userData) {
            const { id, apiKey } = userData;
            const response = await saveActividad(idActividad, tiempo, fecha, apiKey);
            if (response && response.codigo === 200) {
              dispatch(onAddActividad(response.actividad));
              onToggleModal();
            } else {
              setShowAlert(true);
              setAlertMessage("Error al registrar la actividad.");
              setClassMessage("danger");
            }
          }
        } else {
          setShowAlert(true);
          setAlertMessage("Completa todos los campos.");
          setClassMessage("warning");
        }
      };

      const handleSelectChange = (event)=>{
        setSelectedOption(event.target.value);
      };
    
      return (
        <div className="container">
          <h2>Registrar actividad</h2>
          <form>
            {showAlert && <Alert classColor={classMessage} message={alertMessage} />}
            <div className="form-group">
              <label htmlFor="actividad">Actividad</label>
              <select
                    id="actividad"
                    value = {selectedOpcion}
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