import { useState } from "react";
import ChartContainer from "./ChartContainer/ChartContainer";
import Stats from "./Stats/Stats";
import ActivityList from "./ListadoActividades/ActivityList";
import RegistroActividad from "./RegistroActividades/RegistroActividad";

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const _onToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Stats />
      <ChartContainer />
      <ActivityList onToggleModal={_onToggleModal} />
      {showModal ? <RegistroActividad onToggleModal={_onToggleModal} /> : ""}
    </>
  );
};
export default Main;
