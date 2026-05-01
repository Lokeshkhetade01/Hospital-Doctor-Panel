import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPatientHistory = createAsyncThunk(
  "patientHistory/fetch",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://hospital-backend-fwrb.onrender.com/api/doctors/me/patients/${id}/history`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "History not found");
    }
  }
);

const patientHistorySlice = createSlice({
  name: "patientHistory",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearHistory: (state) => { state.data = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientHistory.pending, (state) => { state.loading = true; })
      .addCase(fetchPatientHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPatientHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearHistory } = patientHistorySlice.actions;
export default patientHistorySlice.reducer;