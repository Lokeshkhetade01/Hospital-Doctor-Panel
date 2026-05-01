import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import dashboardReducer from "./slices/dashboard/dashboardSlice"
import appointmentReducer from "./slices/appointment/appointmentSlice"
import patientReducer from "./slices/patient/getPatientSlice"
import patientHistoryReducer from "./slices/patient/getPatientHistorySlice"
import profileReducer from "./slices/profile/profileSlice" 
import updateStatusReducer from "./slices/appointment/updateStatusSlice"
import prescriptionReducer from "./slices/appointment/prescriptionSlice"
import getPrescriptionsReducer from "./slices/prescriptions/getPrescriptionsView"
import getReceiptReducer from "./slices/prescriptions/getReceiptSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    appointments: appointmentReducer,
    updateStatus: updateStatusReducer,
    patients: patientReducer,
    patientHistory: patientHistoryReducer,
    profile:profileReducer,
    prescription:prescriptionReducer,
    getPrescriptions: getPrescriptionsReducer,
    getReceipt: getReceiptReducer,
  },
})