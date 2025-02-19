import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { AppContext } from "./context/AppContext";

import "./App.css";

import Navigation from "./view/Sidebar/Sidebar";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RegisterConfirmEmail from "./pages/Register/RegisterConfirmEmail";
import RegisterReSendEmail from "./pages/Register/RegisterReSendEmail";
import RegisterHelp from "./pages/Register/RegisterHelp";

import Dashboard from "./pages/Dashboard/Dashboard";
import Service from "./pages/Service/Service";
import Professional from "./pages/Professional/Professional";
import ProfessionalRegister from "./pages/Professional/ProfessionalRegister";
import Image from "./pages/Image/Image";
import Store from "./pages/Store/Store";
import StoreConfigurar from "./pages/Store/StoreConfigure";
import Payment from "./pages/Payment/Payment";
import CallHelp from "./pages/CallHelp/CallHelp";
import { Appointment } from "./pages/Appointment/Appointment";
import AppointmentHistory from "./pages/Appointment/AppointmentHistory";
import Calendar from "./pages/Calendar/Calendar";


function App() {
  const context = useContext(AppContext);
  const authToken = context?.authToken; 
  const isAuthenticated = authToken !== null;

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App" style={{ display: "flex" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm-email" element={<RegisterConfirmEmail />} />
          <Route path="/resend-email" element={<RegisterReSendEmail />} />
          <Route path="/help-login" element={<RegisterHelp />} />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <React.Fragment>
                  <Navigation />
                  <div style={{ flex: 1, marginLeft: "19.5rem" }}>
                    <Routes>
                      <Route path="/appointment" element={<Appointment />} />
                      <Route path="/appointment-history" element={<AppointmentHistory />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/service" element={<Service />} />
                      <Route path="/professional-register" element={<ProfessionalRegister />} />
                      <Route path="/professional" element={<Professional />} />
                      <Route path="/image" element={<Image />} />
                      <Route path="/store" element={<Store />} />
                      <Route path="/store-configure" element={<StoreConfigurar />} />
                      <Route path="/payment" element={<Payment />} />
                      <Route path="/callhelp" element={<CallHelp	 />} />
                    </Routes>
                  </div>
                </React.Fragment>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
