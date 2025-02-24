import Bar from "./Bar";
import Pie from "./Pie";

const ChartContainer = () => {
  return (
    <div className="row my-3 justify-content-center">
      <div className="col-md-6 d-flex justify-content-center">
        <div className="card">
          <div className="card-body d-flex justify-content-center align-items-center">
            <Bar style={{ maxWidth: "400px", width: "100%" }} />
          </div>
        </div>
      </div>

      <div className="col-md-6 d-flex justify-content-center">
        <div className="card">
          <div className="card-body d-flex justify-content-center align-items-center">
            <Pie style={{ maxWidth: "400px", width: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartContainer;
