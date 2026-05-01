import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://hospital-backend-fwrb.onrender.com/api/doctors/me/dashboard";

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // LocalStorage se token liya
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, // Header mein token bheja
        },
      });
      return response.data.data; // Response ka 'data' object return kiya
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch dashboard");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: null,
    upcomingAppointments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.upcomingAppointments = action.payload.upcomingAppointments;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;