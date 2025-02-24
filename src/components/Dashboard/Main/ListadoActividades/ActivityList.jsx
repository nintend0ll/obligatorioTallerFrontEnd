import { useState } from 'react';
import Button from "../../../UI/Button/Button";
import ActivityTable from "./ActivityTable/ActivityTable";
import RegistroActividad from "../RegistroActividades/RegistroActividad"; 
import "./ActivityList.css";

const ActivityList = ({onToggleModal}) => {
    const [showRegistro, setShowRegistro] = useState(false); 

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
                        type={"submit"}
                        classColor={"btn-success"}
                        onHandleClick={onToggleModal} 
                    />
                </div>
            </div>

            {showRegistro && ( 
                <div className="registro-actividad-container">
                    <RegistroActividad onToggleModal={toggleRegistro} />
                </div>
            )}
        </>
    );
};

export default ActivityList;
