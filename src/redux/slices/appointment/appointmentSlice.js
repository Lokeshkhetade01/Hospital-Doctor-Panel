import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://hospital-backend-fwrb.onrender.com/api/doctors/me/appointments";

export const fetchAllAppointments = createAsyncThunk(
  "appointments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // appointments array aur total count yahan se milega
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch appointments");
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    data: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.appointments;
        state.total = action.payload.total;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appointmentSlice.reducer;