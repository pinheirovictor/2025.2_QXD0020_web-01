import { useParams, Link, Routes, Route, Outlet, useNavigate } from "react-router-dom";

function Fotos() {
  return <p>📸 Galeria de fotos do destino.</p>;
}

function Dicas() {
  return <p>💡 Dicas de viagem e cultura local.</p>;
}

export default function Destino() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Detalhes do Destino #{id}</h2>
      <p>Informações turísticas sobre o destino selecionado.</p>

      <nav>
        <Link to="fotos">Fotos</Link> |{" "}
        <Link to="dicas">Dicas</Link>
      </nav>

      <Routes>
        <Route path="fotos" element={<Fotos />} />
        <Route path="dicas" element={<Dicas />} />
      </Routes>

      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}
