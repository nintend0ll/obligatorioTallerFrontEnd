import Bar from "./Bar/Bar";
import Pie from "./Pie/Pie";

const ChartContainer = () => {
    return (
      <div className="row my-3">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">

              <div className="placeholder">
              <Bar/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">

              <div className="placeholder">
              <Pie/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ChartContainer;
  