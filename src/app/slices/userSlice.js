import { createSlice } from "@reduxjs/toolkit";
import { getActividades } from "../../services/api"; // Asegúrate de importar la función correcta
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRegistros } from "../../services/api";
// Acción asíncrona para cargar actividades desde la API
export const fetchActivities = createAsyncThunk(
  "userSlice/fetchActivities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getActividades();
      return response; // Se pasará automáticamente como payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchRegistros = createAsyncThunk(
  "userSlice/fetchRegistros",
  async (_, { getState, rejectWithValue }) => {
    try {
      const iduser = getState().userSlice.userData?.id; // Obtener el ID del usuario
      if (!iduser) throw new Error("Usuario no autenticado");
      
      const response = await getRegistros(iduser);
      return response; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: null,
    activities: [],
    registros:[],
    loading : true,
    error : null,
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
    onDeleteActivity:(state, action)=>{
      const{payload}=action;
      //console.log("payload recibido: "+payload);
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
  },  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRegistros.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegistros.fulfilled, (state, action) => {
        state.loading = false;
        state.registros = action.payload.registros; // Asegúrate de acceder a la propiedad correcta
      })
      .addCase(fetchRegistros.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
  
});
export const { onLogin, onLogout, setRegistros, setActivities, onAddActividad, onDeleteActivity } =
  userSlice.actions;
export default userSlice.reducer;
