import { useEffect, useRef, useState } from "react";
import Alert from "../../../UI/Alert/Alert";
import {
  getActividades,
  getRegistros,
  saveRegistro,
} from "../../../../services/api";
import Button from "../../../UI/Button/Button";
import { getUserDataFromLocalStorage } from "../../../../utils/utils";
import { useDispatch } from "react-redux";
import "./RegistroActividad.css";
import { setRegistros } from "../../../../app/slices/userSlice";

const RegistroActividad = ({ onToggleModal }) => {
  const actividadRef = useRef();
  const duracionRef = useRef();
  const fechaRef = useRef();

  const dispatch = useDispatch();

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [classMessage, setClassMessage] = useState("");

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
    const fechaIngresada = fechaRef.current.value;
    const fechaActual = new Date().toISOString().split("T")[0];

    if (fechaIngresada > fechaActual) {
      setShowAlert(true);
      setAlertMessage("No puedes registrar actividades en el futuro.");
      setClassMessage("danger");
      return;
    }

    if (duracionRef.current.value <= 0) {
      setShowAlert(true);
      setAlertMessage("La duración debe ser mayor a 0.");
      setClassMessage("danger");
      return;
    }

    try {
      const userData = getUserDataFromLocalStorage();
      if (!userData) return;

      const respuesta = await saveRegistro(
        Number(actividadRef.current.value),
        userData.id,
        Number(duracionRef.current.value),
        fechaIngresada
      );

      if (respuesta.codigo !== 200) {
        setAlertMessage("Error");
        setClassMessage("danger");
      }

      const responseRegistros = await getRegistros(
        userData.id,
        userData.apiKey
      );

      dispatch(setRegistros(responseRegistros.registros)); // Agrego la nueva lista de registros al slice

      setAlertMessage("Actividad registrada con éxito");
      setClassMessage("success");
    } catch (error) {
      setAlertMessage("Error al registrar actividad");
      setClassMessage("danger");
    }
  };

  return (
    <div className="container">
      <h2>Registrar actividad</h2>
      <form>
        {showAlert && (
          <Alert classColor={classMessage} message={alertMessage} />
        )}
        <div className="form-group">
          <label htmlFor="actividad">Actividad</label>
          <select
            id="actividad"
            ref={actividadRef}
            onChange={handleSelectChange}
            className="form-control"
          >
            <option value="">Selecciona una actividad</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="duracion">Tiempo (minutos)</label>
          <input
            type="number"
            id="duracion"
            ref={duracionRef}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            id="fecha"
            ref={fechaRef}
            className="form-control"
          />
        </div>
        <Button
          type="button"
          classColor="btn btn-primary"
          cta="Registrar"
          onHandleClick={_onHandleClick}
        />
      </form>
    </div>
  );
};

export default RegistroActividad;
