import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const Pie = () => {
  const registros = useSelector((state) => state.userSlice.registros) ?? [];

  //Obtenemos los ultimos siete dias con dayjs
  const ultimosSieteDias = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(i, "day").format("DD-MM-YYYY")
  ).reverse();

  // Mapeamos los registros a un diccionario con fechas
  const datosPorDia = registros.reduce((acc, registro) => {
    const fecha = dayjs(registro.fecha).format("DD-MM-YYYY");
    acc[fecha] = (acc[fecha] || 0) + registro.tiempo;
    return acc;
  }, {});

  // Creamos los datos del gráfico asegurando que todos los días estén representados
  const series = ultimosSieteDias.map((fecha) => datosPorDia[fecha] || 0);
  const labels = ultimosSieteDias;

  // Verificamos si la serie tiene datos
  const hayDatos = series.some((valor) => valor > 0);

  if (!hayDatos) {
    return <h3>No hay datos disponibles</h3>;
  }

  const options = {
    labels,
    chart: { type: "pie" },
    legend: { position: "bottom" },
    colors: [
      "#6FA3E7",
      "#FF6B8A",
      "#FFA07A",
      "#55C89F",
      "#C084CF",
      "#FFB570",
      "#9E9CE6",
      "#E87075",
    ],
  };

  return (
    <div>
      <h3>Minutos ejercitados en los últimos 7 días</h3>
      <Chart options={options} series={series} type="pie" width={380} />
    </div>
  );
};

export default Pie;
