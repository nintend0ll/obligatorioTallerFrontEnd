import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const Pie = () => {
  const registros = useSelector((state) => state.userSlice.registros);

  // Obtener los últimos 7 días en formato YYYY-MM-DD
  const ultimosSieteDias = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(i, "day").format("YYYY-MM-DD")
  ).reverse();

  // Mapear los registros a un diccionario con fechas
  const datosPorDia = registros.reduce((acc, registro) => {
    const fecha = dayjs(registro.fecha).format("YYYY-MM-DD");
    acc[fecha] = (acc[fecha] || 0) + registro.tiempo;
    return acc;
  }, {});

  // Crear los datos del gráfico asegurando que todos los días estén representados
  const series = ultimosSieteDias.map((fecha) => datosPorDia[fecha] || 0);
  const labels = ultimosSieteDias;

  const options = {
    labels,
    chart: { type: "pie" },
    legend: { position: "bottom" },
  };

  return (
    <div>
      <h3>Minutos ejercitados en los últimos 7 días</h3>
      <Chart options={options} series={series} type="pie" width={380} />
    </div>
  );
};

export default Pie;
