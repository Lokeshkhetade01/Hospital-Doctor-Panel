import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://hospital-backend-fwrb.onrender.com/api/doctors/me/patients";

export const fetchPatients = createAsyncThunk(
  "patients/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Includes total, pages, and patients array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch patients");
    }
  }
);

const patientSlice = createSlice({
  name: "patients",
  initialState: {
    data: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.patients;
        state.total = action.payload.total;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default patientSlice.reducer;