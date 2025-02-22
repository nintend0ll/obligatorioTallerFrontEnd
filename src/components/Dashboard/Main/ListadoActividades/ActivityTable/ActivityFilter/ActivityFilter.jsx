import { useState } from "react";


const ActivityFilter=({onFilterChange})=>{
    const [selectedFilter, setSelectedFilter]=useState("all");

    const handleFilterChange=(filter)=>{
        setSelectedFilter(filter);
        onFilterChange(filter);
    };

    return(
        <div className="filter-container">
            <button
                className={`filter-btn ${selectedFilter === "week" ? "active" : ""}`}
                onClick={()=>handleFilterChange("week")}
                >Última semana</button>
                <button
                className={`filter-btn ${selectedFilter === "month" ? "active" : ""}`}
                onClick={() => handleFilterChange("month")}
            >
                Último mes
            </button>
            <button
                className={`filter-btn ${selectedFilter === "all" ? "active" : ""}`}
                onClick={() => handleFilterChange("all")}
            >
                Ver todo
            </button>
        </div>
    );
}
export default ActivityFilter;