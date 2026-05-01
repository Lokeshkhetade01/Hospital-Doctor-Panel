import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import MainLayout from "./components/layout/MainLayout";
import Appointment from "./pages/Appointment/Appointment";
import PublicRoutes from "./routes/PublicRoutes";
import { ToastContainer, Slide } from "react-toastify";
import ProtectedRoute from "./routes/ProtectedRoute";
import MyPatient from "./pages/patient/MyPatient";
import PatientHistory from "./pages/patient/PatientHistory";
import Profile from "./pages/profile/Profile";
import Prescriptions from "./pages/Appointment/Prescriptions";
import PrescriptionsView from "./pages/prescriptionsData/PrescriptionsView";
const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light"
        transition={Slide}
        toastClassName="rounded-xl shadow-lg"
        bodyClassName="text-sm font-medium"
        progressClassName="bg-gradient-to-r from-green-400 to-blue-500"
      />
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointment />} />
            <Route path="/appointments/prescriptions/:id" element={<Prescriptions/>} />
            <Route path="/patients" element={<MyPatient/>} />
            <Route path="/patients/history/:id" element={<PatientHistory/>} />
            <Route path="/prescriptions" element={<PrescriptionsView/>} />
            <Route path="/profile" element={<Profile/>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
