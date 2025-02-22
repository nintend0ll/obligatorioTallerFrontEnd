import { useSelector } from "react-redux";
import "./Stats.css";
import StatsInfo from "./StatsInfo/StatsInfo";
import dayjs from "dayjs";
import MsgProgress from "./MsgProgress";

const Stats = () => { 
    const registros = useSelector((state) => state.userSlice.registros);
    
    const _getTiempoTotal = () => {
        return registros.reduce((total, registro) => total + registro.tiempo, 0);
    };

  
  const _getTiempoDiario = () => {
    const hoy = dayjs().format("YYYY-MM-DD");
    return registros
      .filter((registro) => dayjs(registro.fecha).format("YYYY-MM-DD") === hoy)
      .reduce((total, registro) => total + registro.tiempo, 0);
  };

return (
  <div className="row">
    <div className="col ">
      <StatsInfo title={"Tiempo Total"} value={`${_getTiempoTotal()}`} />
    </div>
    <div className="col ">
      <StatsInfo title={"Tiempo Diario"} value={`${_getTiempoDiario()}`} classColor={"stats-info"} />
    </div>
    <div className="col ">
      <MsgProgress />
    </div>
  </div>
);
};

export default Stats;