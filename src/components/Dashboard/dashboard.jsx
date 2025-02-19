import { useEffect, useState } from "react";
import Header from "./Header/Header";
import { getRegistros } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => { 

    const userData = useSelector((state) => state.userSlice.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            if (userData) {
                const {id} = userData;
                const {apikey} = userData;
                const response = await getRegistros(id, apikey);
                dispatch(getRegistros(response));
            }
        }
        fetchData();
    }, []);



    return (
    <div className="container-fluid">
        <Header/>
    </div>
    );

 };

 export default Dashboard;