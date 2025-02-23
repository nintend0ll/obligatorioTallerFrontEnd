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
                    >Ultima semana</button>
                    <button
                    className={`filter-btn ${selectedFilter === "month" ? "active" : ""}`}
                    onClick={() => handleFilterChange("month")}
                >
                    Último Mes
                </button>
                <button
                    className={`filter-btn ${selectedFilter === "all" ? "active" : ""}`}
                    onClick={() => handleFilterChange("all")}
                >
                    ver todo
                </button> 
                </>
    );
}
export default ActivityFilter;

