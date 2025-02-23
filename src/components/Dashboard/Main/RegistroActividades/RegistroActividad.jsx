import { useEffect, useRef, useState } from 'react'; // Importa useEffect, useRef, useState
import Alert from "../../../UI/Alert/Alert";
import { getActividades, saveActividad } from '../../../../services/api';
import Button from "../../../UI/Button/Button";
import { getUserDataFromLocalStorage } from "../../../../utils/utils";
import { useDispatch } from 'react-redux';
import "./RegistroActividad.css";
import { onAddActividad } from '../../../../app/slices/userSlice';


const RegistroActividad = ({ onToggleModal }) => {
  const actividadRef = useRef();
  const duracionRef = useRef();
  const fechaRef = useRef();

  const dispatch = useDispatch();

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');   
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar un mensaje de alerta
  const [alertMessage, setAlertMessage] = useState('');
  const [classMessage, setClassMessage] = useState(''); // Estado para la clase del mensaje de alerta

  const fetchActivities = async () => {
    try {

      const response = await getActividades();
      
      if (response.codigo === 200) {
        setOptions(response.actividades);
      } else {
        setShowAlert(true);
        setAlertMessage("Error al cargar las actividades");
        setClassMessage("danger");
      }
    } catch (error) {
      setShowAlert(true);
      setAlertMessage("Error al cargar las actividades" + error);
      setClassMessage("danger");
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  
  const _onHandleClick = async () => {
    console.log('Entró a _onHandleClick');
    
    const fechaIngresada = fechaRef.current.value;
    const fechaActual = new Date().toISOString().split("T")[0];

    if (fechaIngresada > fechaActual) {
      setShowAlert(true);
      setAlertMessage("No puedes registrar actividades en el futuro.");
      setClassMessage("danger");
      return;
    }

    try {
      const userData = getUserDataFromLocalStorage();
      if (!userData) return;

      
      const respuesta = await saveActividad(
        Number(actividadRef.current.value),
        userData.id,
        Number(duracionRef.current.value),
        fechaIngresada
      );

      const nuevaActividad = {
          idActividad: respuesta.idActividad, 
          idUsuario: respuesta.idUsuario, 
          tiempo: respuesta.tiempo, 
          fecha: respuesta.fecha,
      };

      dispatch(onAddActividad([nuevaActividad]));  

      setAlertMessage("Actividad registrada con éxito");
      setClassMessage("success");

    } catch (error) {
      console.log(error);
      setAlertMessage("Error al registrar actividad");
      setClassMessage("danger");
    }
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
            ref={actividadRef}
            onChange={handleSelectChange}
            className='form-control'
          >
            <option value="">Selecciona una actividad</option>
            {options.map(option => (
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