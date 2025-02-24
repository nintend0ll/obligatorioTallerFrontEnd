import ReactApexChart from "react-apexcharts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../../../../../app/slices/userSlice";
import { fetchRegistros } from "../../../../../app/slices/userSlice";
const Bar = () => {

  const dispatch = useDispatch();
  const registrosArray = useSelector((state)=> state.userSlice.registros)??[];


  const { activities, loading, error } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (!activities?.actividades?.length) {
      dispatch(fetchActivities());
    }
    dispatch(fetchRegistros()); // Ahora también obtenemos los registros
  }, [dispatch, activities]);

  if (loading) return <p>Cargando actividades...</p>;
  if (error) return <p>Error al cargar actividades: {error}</p>;

  // 💡 Asegurar que `activities` y `activities.actividades` existan
  const actividadesArray = activities?.actividades ?? []; // Si no existe, usa []

  console.log("actividadesArray:", actividadesArray);

const sesionesPorActividad = registrosArray.reduce((acc, reg)=>{
  const actividad = activities?.actividades?.find(act => act.id ===reg.idActividad);
  if(actividad){
    acc[actividad.nombre] = (acc[actividad.nombre]||0)+1;
  }
  return acc;
}, {})

const categorias = Object.keys(sesionesPorActividad);
const cantidades = Object.values(sesionesPorActividad);

console.log("categorias: "+categorias);
console.log("cantidad de sesiones: " + cantidades);

if(categorias.length===0){
return <h3>No hay sesiones registradas</h3>;
}


  const state = {
    series: [{name:"Sesiones", data:cantidades}],
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
      xaxis:{categories : categorias},
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
