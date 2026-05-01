import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDoctorPrescriptions = createAsyncThunk(
  "prescriptions/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://hospital-backend-fwrb.onrender.com/api/doctors/me/prescriptions",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // This returns the object with "prescriptions" array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch");
    }
  }
);

const getPrescriptionsView = createSlice({
  name: "getPrescriptions",
  initialState: {
    data: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorPrescriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctorPrescriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.prescriptions;
        state.total = action.payload.total;
      })
      .addCase(fetchDoctorPrescriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getPrescriptionsView.reducer;