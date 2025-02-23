import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const Bar = () => {
  const actividades = useSelector((state) => state.userSlice.activities); // Ajusta el nombre si es registros

  const actividadMap = actividades.reduce((acc, act) => {
    acc[act.id] = act.nombre;
    return acc;
  }, {});

  const actividadesUnicas = [...new Set(actividades.map((a) => a.idActividad))];

  const _getSesionesPorActividad = () => {
    return actividadesUnicas.map(
      (actividad) => actividades.filter((a) => a.idActividad === actividad).length
    );
  };

  const state = {
    series: [{ data: _getSesionesPorActividad() }],
    options: {
      chart: { type: "bar", height: 350 },
      colors: ["#007BFF", "#28A745", "#FFC107", "#DC3545", "#17A2B8"], 
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: false,
          distributed: true, 
        },
      },
      dataLabels: { enabled: true },
      categories: actividadesUnicas.map(id => actividadMap[id] )
    },
  };

  return (
    <div>
    <h3>Sesiones por actividad</h3>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default Bar;