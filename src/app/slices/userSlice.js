import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: null,
    activities: [],
    registros:[],
  },
  reducers: {
    onLogin: (state, action) => {
      const { payload } = action;
      state.userData = payload;
      localStorage.setItem("userData", JSON.stringify(payload));
    },
    onLogout: (state) => {
      state.userData = null;
      localStorage.removeItem("userData");
    },
    setRegistros:(state, action) =>{
      state.registros = action.payload;
    },
    onDeleteActivity:(state, action)=>{
      const{payload}=action;
      console.log("payload recibido: "+payload);
      const filteredActivities= state.registros.filter((a)=>a.id!==payload);
      state.activities =filteredActivities;
    },
    setActivities: (state, action) => { 
      state.activities = action.payload;
    },
    onAddActividad: (state, action) => {
      const {payload} = action;
      state.registros = [...state.registros, payload];
    },
  },
});
export const { onLogin, onLogout, setRegistros, setActivities, onDeleteActivity, onAddActividad } =
  userSlice.actions;
export default userSlice.reducer;
