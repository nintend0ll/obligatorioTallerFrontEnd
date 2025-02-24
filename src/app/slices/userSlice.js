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
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    onLogout: (state) => {
      state.userData = null;
      localStorage.removeItem("userData");
    },
    setRegistros: (state, action) => {
      state.registros = action.payload; 
    },
    onDeleteActivity: (state, action) => {
      state.registros = state.registros.filter((a) => a.id !== action.payload); 
    },
    setActivities: (state, action) => {
      state.activities = action.payload; 
    },
  },
});
export const { onLogin, onLogout, setRegistros, setActivities, onDeleteActivity } =
  userSlice.actions;
export default userSlice.reducer;
