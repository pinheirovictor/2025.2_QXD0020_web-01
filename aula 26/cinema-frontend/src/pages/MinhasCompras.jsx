import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./MinhasCompras.css";

export default function MinhasCompras() {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    api.get("/compras/minhas")
      .then(res => setCompras(res.data));
  }, []);

  return (
    <div className="compras-container">
      <h2>🎟️ Meus Ingressos</h2>

      <Link className="voltar-link" to="/">
        ← Voltar para sessões
      </Link>

      {compras.length === 0 && (
        <p className="compras-vazio">
          Você ainda não comprou ingressos.
        </p>
      )}

      <div className="compras-lista">
        {compras.map(c => (
          <div key={c.id} className="compra-card">
            <p><strong>Sessão:</strong> {c.sessao_id}</p>
            <p><strong>Quantidade:</strong> {c.quantidade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
