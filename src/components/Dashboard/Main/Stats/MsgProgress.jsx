import { useSelector } from "react-redux";
import dayjs from "dayjs";

const MsgProgress = () => {
    const registros = useSelector((state) => state.userSlice.registros);
    
    const getTiempoPorFecha = (fecha) => {
        return registros
            .filter((registro) => dayjs(registro.fecha).format("YYYY-MM-DD") === fecha)
            .reduce((total, registro) => total + registro.tiempo, 0);
    };

    const hoy = dayjs().format("YYYY-MM-DD");
    const ayer = dayjs().subtract(1, "day").format("YYYY-MM-DD");

    const tiempoHoy = getTiempoPorFecha(hoy);
    const tiempoAyer = getTiempoPorFecha(ayer);

    const mensaje = tiempoHoy > tiempoAyer ? "¡Bien hecho!" : "¡Que no decaiga!";

    return (
        <div className="progress-container">
            <h3>Evolución Personal</h3>
            <p>{mensaje}</p>
        </div>
    );
};

export default MsgProgress;
