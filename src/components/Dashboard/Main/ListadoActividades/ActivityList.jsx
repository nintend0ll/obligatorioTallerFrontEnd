import Button from "../../../UI/Button/Button"
import ActivityTable from "./ActivityTable/ActivityTable"


const ActivityList = ({onToggleModal})=>{


    return(
        <>                
            <div className="row w-100 my-2">
                <div className="col text-right">
                <Button
                    cta={"registrar actividad"}
                    type={"submit"}
                    classColor={"btn-success"}
                    onHandleClick={onToggleModal}
                />
                </div>
            </div>
            <div className="row my-3">
                <div className="col-12">
                <div className="card">
                    <div className="card-body">
                    <ActivityTable />
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
export default ActivityList;