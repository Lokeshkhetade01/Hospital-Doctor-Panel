import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify"; // Aap react-hot-toast ya koi bhi library use kar sakte hain
import { fetchAllAppointments } from "./appointmentSlice";

export const updateAppointmentStatus = createAsyncThunk(
  "appointments/updateStatus",
  async ({ id, status }, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://hospital-backend-fwrb.onrender.com/api/doctors/me/appointments/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success(`Status updated to ${status} successfully!`);
      dispatch(fetchAllAppointments()); // Table data refresh karne ke liye
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update status";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const updateStatusSlice = createSlice({
  name: "updateStatus",
  initialState: { loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateAppointmentStatus.pending, (state) => { state.loading = true; })
      .addCase(updateAppointmentStatus.fulfilled, (state) => { state.loading = false; })
      .addCase(updateAppointmentStatus.rejected, (state) => { state.loading = false; });
  },
});

export default updateStatusSlice.reducer;