const StatsInfo = ({ title, value, classColor = "stats-default" }) => {
    return (
      <div className={`col ${classColor}`}>
        <h4>{title}</h4>
        <p>{value} min</p>
      </div>
    );
  };
  
  export default StatsInfo;