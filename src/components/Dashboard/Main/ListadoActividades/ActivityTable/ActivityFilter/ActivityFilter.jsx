import { useState } from "react";


const ActivityFilter=({onFilterChange})=>{
    const [selectedFilter, setSelectedFilter]=useState("all");

    const handleFilterChange=(filter)=>{
        setSelectedFilter(filter);
        onFilterChange(filter);
    };

    return(
        <>
                <button
                    className={`filter-btn ${selectedFilter === "week" ? "active" : ""}`}
                    onClick={()=>handleFilterChange("week")}
                    style={{ margin: "5px" }}
                    >Última semana</button>
                    <button
                    className={`filter-btn ${selectedFilter === "month" ? "active" : ""}`}
                    onClick={() => handleFilterChange("month")}
                    style={{ margin: "5px" }}
                >
                    Último mes
                </button>
                <button
                    className={`filter-btn ${selectedFilter === "all" ? "active" : ""}`}
                    onClick={() => handleFilterChange("all")}
                    style={{ margin: "5px" }}
                >
                    Ver todo
                </button> 
                </>
    );
}
export default ActivityFilter;