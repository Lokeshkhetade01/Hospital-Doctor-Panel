import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const downloadPrescriptionPDF = createAsyncThunk(
  "prescription/downloadPDF",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored here
      const response = await axios.get(
        `https://hospital-backend-fwrb.onrender.com/api/doctors/me/prescriptions/${id}/pdf`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Important for PDF/Files
        }
      );

      // Create a URL for the blob
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      // Open in new tab
      window.open(fileURL, "_blank");

      // Optional: Auto-download logic if you want to force download as well
      // const link = document.createElement('a');
      // link.href = fileURL;
      // link.setAttribute('download', `prescription-${id}.pdf`);
      // document.body.appendChild(link);
      // link.click();

      return id; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to download PDF");
    }
  }
);

const getReceiptSlice = createSlice({
  name: "getReceipt",
  initialState: {
    loading: false,
    error: null,
    downloadingId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(downloadPrescriptionPDF.pending, (state, action) => {
        state.loading = true;
        state.downloadingId = action.meta.arg; // Track which specific card is loading
      })
      .addCase(downloadPrescriptionPDF.fulfilled, (state) => {
        state.loading = false;
        state.downloadingId = null;
      })
      .addCase(downloadPrescriptionPDF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.downloadingId = null;
      });
  },
});

export default getReceiptSlice.reducer;