import Button from "../../../UI/Button/Button";
import ActivityTable from "./ActivityTable/ActivityTable";
import "./ActivityList.css";

const ActivityList = ({ onToggleModal }) => {
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
        </>
    );
};

export default ActivityList;
