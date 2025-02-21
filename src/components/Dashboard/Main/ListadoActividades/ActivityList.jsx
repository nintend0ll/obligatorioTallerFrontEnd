import { useState } from 'react';
import Button from "../../../UI/Button/Button";
import ActivityTable from "./ActivityTable/ActivityTable";
import RegistroActividad from "../RegistroActividades/RegistroActividad"; // Import RegistroActividad
import "./ActivityList.css";

const ActivityList = () => {
    const [showRegistro, setShowRegistro] = useState(false); // Estado para controlar la visibilidad

    const toggleRegistro = () => {
        setShowRegistro(!showRegistro);
    };

    return (
        <>
            <div className="activity-list-container">
                <div className="activity-card">
                    <div className="card">
                        <div className="card-body">
                            <ActivityTable />
                        </div>
                    </div>
                </div>

                <div className="activity-footer">
                    <Button
                        cta={"Registrar Actividad"}
                        type={"button"}
                        classColor={"btn-success"}
                        onHandleClick={toggleRegistro} // Cambiar el estado al hacer clic
                    />
                </div>
            </div>

            {showRegistro && ( // Renderizar condicionalmente el formulario
                <div className="registro-actividad-container">
                    <RegistroActividad onToggleModal={toggleRegistro} />
                </div>
            )}
        </>
    );
};

export default ActivityList;
