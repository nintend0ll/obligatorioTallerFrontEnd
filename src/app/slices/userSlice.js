import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: null,
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
    /*onLoadRegistros: (state, action) => {
        const { payload } = action;
        state.
    },*/
  },
});
export const { onLogin, onLogout } =
  userSlice.actions;
export default userSlice.reducer;
