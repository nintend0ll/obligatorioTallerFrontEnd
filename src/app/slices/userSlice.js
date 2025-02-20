import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

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
      state.registros =action.payload;
    },
    /*onLoadRegistros: (state, action) => {
        const { payload } = action;
        state.
    },*/
  },
});
export const { onLogin, onLogout, setRegistros } =
  userSlice.actions;
export default userSlice.reducer;
