import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPrescription = createAsyncThunk(
  "prescription/create",
  async (prescriptionData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Assumes token is stored here
      const response = await axios.post(
        "https://hospital-backend-fwrb.onrender.com/api/doctors/me/prescriptions",
        prescriptionData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const prescriptionSlice = createSlice({
  name: "prescription",
  initialState: { loading: false, success: false, error: null },
  reducers: {
    resetPrescriptionState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPrescription.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPrescription.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createPrescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPrescriptionState } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;