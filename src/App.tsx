import "./App.css";
import Navigation from "./view/Sidebar";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  const isAuthenticated = true;

  return (
    <div className="App" style={{ display: "flex" }}>
      <Router>
        <Routes>
          {/* Tela de Login, isolada */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas protegidas para usuários autenticados */}
          {isAuthenticated && (
            <Route
              path="/*"
              element={
                <>
                  <Navigation />
                  <div style={{ flex: 1, marginLeft: "18.75rem" }}>
                    <Routes>
                      <Route path="/appointment" element={<Appointment />} />
                      <Route
                        path="/appointment-history"
                        element={<AppointmentHistory />}
                      />
                      <Route
                        path="/dashboard"
                        element={<h1 style={{ padding: "40px" }}>Dashboard</h1>}
                      />
                      <Route path="/service" element={<Service />} />
                      <Route path="/professional" element={<Professional />} />
                      <Route path="/image" element={<Image />} />
                      <Route path="/store" element={<Store />} />
                      <Route
                        path="/store-configure"
                        element={<StoreConfigurar />}
                      />
                      <Route path="/payment" element={<Payment />} />
                      <Route path="/chamada" element={<Chamada />} />
                    </Routes>
                  </div>
                </>
              }
            />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
