import { useState } from "react";
import ActivityList from "./ListadoActividades/ActivityList";
import RegistroActividad from "./RegistroActividades/RegistroActividad";

const Main=()=>{
    const [showModal, setShowModal] = useState(false);
    const _onToggleModal = ()=>{
        setShowModal(!showModal);
    };

    return(
        <>
        <ActivityList onToggleModal = {_onToggleModal}/>
        {showModal ? <RegistroActividad onToggleModal={_onToggleModal}/> : ""}
        </>
    );


};
export default Main;