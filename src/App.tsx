import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";

import { AppContext } from "./context/AppContext";

import "./App.css";

import Navigation from "./view/Sidebar/Sidebar";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import RegisterStore from "./pages/Register/RegisterStore";
import RegisterClient from "./pages/Register/RegisterClient";
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
import RegisterGoogle from "./pages/Register/RegisterGoogle";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppointmentClient } from "./pages/Appointment/AppointmentClient";
import { HomeClient } from "./pages/HomeClient/HomeClient";
import { AppointmentTeste } from "./pages/AppointmentTeste/AppointmentTeste";

function App() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const context = useContext(AppContext);
  const authToken = context?.authToken;
  const isAuthenticated = authToken !== null;

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App" style={{ display: "flex" }}>
        <Router>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/code/:storeCodeParams" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-code/:storeCodeParams" element={<Login />} />
            <Route path="/register-store" element={<RegisterStore />} />
            <Route path="/register-client" element={<RegisterClient />} />
            <Route path="/register-google" element={<RegisterGoogle />} />
            <Route path="/confirm-email" element={<RegisterConfirmEmail />} />
            <Route path="/resend-email" element={<RegisterReSendEmail />} />
            <Route path="/help-login" element={<RegisterHelp />} />

            {/* Rotas Protegidas */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <React.Fragment>
                    <Navigation />
                    <div style={{ flexGrow: 1, overflowX: "hidden" }}>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/service" element={<Service />} />
                        <Route
                          path="/professional-register"
                          element={<ProfessionalRegister />}
                        />
                        <Route
                          path="/professional"
                          element={<Professional />}
                        />
                        <Route path="/image" element={<Image />} />
                        <Route path="/store" element={<Store />} />
                        <Route
                          path="/store-configure"
                          element={<StoreConfigurar />}
                        />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/callhelp" element={<CallHelp />} />
                        <Route path="/appointment" element={<Appointment />} />
                        <Route
                          path="/history-appointment"
                          element={<AppointmentHistory />}
                        />
                        <Route
                          path="/home-client/:storeCodeParams"
                          element={<HomeClient />}
                        />
                        <Route
                          path="/appointment-client/:storeCodeParams"
                          element={<AppointmentClient />}
                        />
                        <Route path="/teste/:storeCodeParams" element={<AppointmentTeste />} />
                      </Routes>
                    </div>
                  </React.Fragment>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
