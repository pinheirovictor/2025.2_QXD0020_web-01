import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Destino from "./pages/Destino";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import NaoEncontrado from "./pages/NaoEncontrado";
import "./App.css"; // <— Importando o estilo

export default function App() {
  return (
    <div className="app-container">
      <h1>Guia de Viagens React 🌎</h1>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/sobre">Sobre</Link> |{" "}
        <Link to="/contato">Contato</Link>
      </nav>
      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destino/:id/*" element={<Destino />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="*" element={<NaoEncontrado />} />
      </Routes>

      <footer>© 2025 Guia de Viagens React</footer>
    </div>
  );
}
