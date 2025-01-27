import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { AppContext } from "./context/AppContext";

import "./App.css";

import Navigation from "./view/Sidebar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterConfirmEmail from "./pages/RegisterConfirmEmail";
import RegisterReSendEmail from "./pages/RegisterReSendEmail";
import RegisterHelp from "./pages/RegisterHelp";

import Dashboard from "./pages/Dashboard";
import Service from "./pages/Service";
import Professional from "./pages/Professional";
import ProfessionalRegister from "./pages/ProfessionalRegister";
import Image from "./pages/Image";
import Store from "./pages/Store";
import StoreConfigurar from "./pages/StoreConfigure";
import Payment from "./pages/Payment";
import CallHelp from "./pages/CallHelp";
import { Appointment } from "./pages/Appointment";
import AppointmentHistory from "./pages/AppointmentHistory";


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
              // <ProtectedRoute>
                <React.Fragment>
                  <Navigation />
                  <div style={{ flex: 1, marginLeft: "18.75rem" }}>
                    <Routes>
                      <Route path="/appointment" element={<Appointment />} />
                      <Route path="/appointment-history" element={<AppointmentHistory />} />
                      <Route path="/dashboard" element={<Dashboard />} />
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
              // </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
