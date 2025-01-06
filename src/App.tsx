import React, { useContext, useEffect } from "react"; // Aqui adicionamos 'React'
import { AppContext } from "./context/AppContext"; 
import "./App.css";
import Navigation from "./view/Sidebar";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Service from "./pages/Service";
import Professional from "./pages/Professional";
import Image from "./pages/Image";
import Store from "./pages/Store";
import Payment from "./pages/Payment";
import Chamada from "./pages/Chamada";
import { Appointment } from "./pages/Appointment";
import AppointmentHistory from "./pages/AppointmentHistory";
import StoreConfigurar from "./pages/StoreConfigure";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import RegisterConfirmEmail from "./pages/RegisterConfirmEmail";
import RegisterReSendEmail from "./pages/RegisterReSendEmail";
import RegisterHelp from "./pages/RegisterHelp";
import ProfessionalRegister from "./pages/ProfessionalRegister";

function App() {
  const context = useContext(AppContext);
  const authToken = context?.authToken; // Usando 'context?.authToken' para evitar erro de undefined
  const isAuthenticated = authToken !== null;

  // Componente de Rota Protegida
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App" style={{ display: "flex" }}>
      <Router>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm-email" element={<RegisterConfirmEmail />} />
          <Route path="/resend-email" element={<RegisterReSendEmail />} />
          <Route path="/help-login" element={<RegisterHelp />} />

          {/* Rotas protegidas, somente acessíveis se estiver autenticado */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                {/* Envolvendo com React.Fragment ou div para passar um único child */}
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
                      <Route path="/chamada" element={<Chamada />} />
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
