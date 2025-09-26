// React & Libs
import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Context
import { AppContext } from "./context/AppContext";

// Styles
import "./App.css";

// Pages - Public
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import RegisterStore from "./pages/Register/RegisterStore";
import RegisterClient from "./pages/Register/RegisterClient";
import RegisterConfirmEmail from "./pages/Register/RegisterConfirmEmail";
import RegisterReSendEmail from "./pages/Register/RegisterReSendEmail";
import RegisterHelp from "./pages/Register/RegisterHelp";
import RegisterGoogle from "./pages/Register/RegisterGoogle";
import ResetPassword from "./pages/Register/ResetPassword";
import ResetChangePassword from "./pages/Register/ResetChangePassword";

// Pages - Protected
import Dashboard from "./pages/Dashboard/Dashboard";
import Service from "./pages/Service/Service";
import Professional from "./pages/Professional/Professional";
import ProfessionalRegister from "./pages/Professional/ProfessionalRegister";
import Image from "./pages/Image/Image";
import Store from "./pages/Store/Store";
import StoreConfigure from "./pages/Store/StoreConfigure";
import Payment from "./pages/Payment/Payment";
import CallHelp from "./pages/CallHelp/CallHelp";
import Appointment from "./pages/Appointment/Appointment";
import AppointmentHistory from "./pages/Appointment/AppointmentHistory";
import Calendar from "./pages/Calendar/Calendar";
import UserConfig from "./pages/User/UserConfig";
import Subscription from "./pages/Subscription/Subscription";

// Pages - Client
import { HomeClient } from "./pages/HomeClient/HomeClient";
import { AppointmentClient } from "./pages/AppointmentClient/AppointmentClient"; 

// Layout
import { ProtectedLayout } from "./ProtectedLayout";

// Axios Instance
import api from "./axiosInstance";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; 
  
  const context = useContext(AppContext);
  const authToken = context?.authToken;

  useEffect(() => {
    if (authToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [authToken]);

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
            <Route
              path="/register-client/:storeCodeParams"
              element={<RegisterClient />}
            />
            <Route path="/register-google" element={<RegisterGoogle />} />
            <Route path="/confirm-email" element={<RegisterConfirmEmail />} />
            <Route path="/resend-email" element={<RegisterReSendEmail />} />
            <Route path="/help-login" element={<RegisterHelp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/reset-change-password"
              element={<ResetChangePassword />}
            />

            {/* Rotas Protegidas que não exigem assinatura */}
            <Route
              path="/user-config"
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <UserConfig />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscription"
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <Subscription />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />

            {/* Rotas Protegidas que exigem assinatura */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiresSubscription={true}>
                  <ProtectedLayout>
                    <Dashboard />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute requiresSubscription={true}>
                  <ProtectedLayout>
                    <Calendar />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/service"
              element={
                <ProtectedRoute requiresSubscription={true}>
                  <ProtectedLayout>
                    <Service />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/professional-register"
              element={
                <ProtectedRoute requiresSubscription={true}>
                  <ProtectedLayout>
                    <ProfessionalRegister />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/professional"
              element={
                <ProtectedRoute requiresSubscription={true}>
                  <ProtectedLayout>
                    <Professional />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/image"
              element={
                <ProtectedRoute requiresSubscription={true}>
                  <ProtectedLayout>
                    <Image />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/store"
              element={
                <ProtectedRoute requiresSubscription={true}>
                  <ProtectedLayout>
                    <Store />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/store-configure"
              element={
                <ProtectedRoute requiresSubscription={true}>
                  <ProtectedLayout>
                    <StoreConfigure />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute requiresSubscription={true}>
                  <ProtectedLayout>
                    <Payment />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/callhelp"
              element={
                <ProtectedRoute requiresSubscription={true}>
                  <ProtectedLayout>
                    <CallHelp />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointment"
              element={
                <ProtectedRoute requiresSubscription={true}>
                  <ProtectedLayout>
                    <Appointment />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/history-appointment"
              element={
                <ProtectedRoute requiresSubscription={true}>
                  <ProtectedLayout>
                    <AppointmentHistory />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/home-client/:storeCodeParams"
              element={
                <ProtectedLayout>
                  <HomeClient />
                </ProtectedLayout>
              }
            />
            <Route
              path="/appointment-client/:storeCodeParams"
              element={
                <ProtectedLayout>
                  <AppointmentClient />
                </ProtectedLayout>
              }
            />

            {/* Redirecionamento para rotas não encontradas */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
