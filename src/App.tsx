import "./App.css";
import Navigation from "./view/Sidebar";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Servico from "./pages/Servico";
import Profissional from "./pages/Profissional";
import Imagem from "./pages/Imagem";
import Loja from "./pages/Loja";
import Pagamento from "./pages/Pagamento";
import Chamada from "./pages/Chamada";

function App() {
  return (
    <div className="App" style={{ display: "flex" }}>
      <Router>
        <Navigation />
        <div style={{ flex: 1}}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/servico" element={<Servico />} />
            <Route path="/profissional" element={<Profissional />} />
            <Route path="/imagem" element={<Imagem />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/pagamento" element={<Pagamento />} />
            <Route path="/chamada" element={<Chamada />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
