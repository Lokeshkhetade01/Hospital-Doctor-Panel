import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://hospital-backend-fwrb.onrender.com/api/doctors/me/profile";

// Fetch Profile
export const fetchDoctorProfile = createAsyncThunk(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.doctor;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// Update Profile
export const updateDoctorProfile = createAsyncThunk(
  "profile/update",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(API_URL, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.doctor;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    loading: false,
    updateLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchDoctorProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateDoctorProfile.pending, (state) => { state.updateLoading = true; })
      .addCase(updateDoctorProfile.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.user = action.payload;
      })
      .addCase(updateDoctorProfile.rejected, (state, action) => {
        state.updateLoading = false;
      });
  },
});

export default profileSlice.reducer;