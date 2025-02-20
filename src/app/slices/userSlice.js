import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: null,
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
      const filteredActivities= state.registros.filter((a)=>a.id!==payload);
      state.activities =filteredActivities;
    }
    /*onLoadRegistros: (state, action) => {
        const { payload } = action;
        state.
    },*/
    onAddActividad: (state, action) => {
      state.registros.push(action.payload); 
    },
  },
});
<<<<<<< Updated upstream
export const { onLogin, onLogout, setRegistros, onAddActividad } = 
=======
export const { onLogin, onLogout, setRegistros, onDeleteActivity } =
>>>>>>> Stashed changes
  userSlice.actions;
export default userSlice.reducer;
