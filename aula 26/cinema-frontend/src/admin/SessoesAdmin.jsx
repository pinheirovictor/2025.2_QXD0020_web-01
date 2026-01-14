import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./SessoesAdmin.css";

export default function SessoesAdmin() {
  const [sessoes, setSessoes] = useState([]);

  useEffect(() => {
    api.get("/sessoes")
      .then(res => setSessoes(res.data));
  }, []);

  return (
    <div className="admin-container">
      {/* Cabeçalho */}
      <div className="admin-header">
        <h2>🎬 Sessões Criadas</h2>

        <Link className="criar-sessao-btn" to="/criar-sessao">
          + Criar nova sessão
        </Link>
      </div>

      {/* Estado vazio */}
      {sessoes.length === 0 && (
        <p className="admin-vazio">
          Nenhuma sessão criada até o momento.
        </p>
      )}

      {/* Lista */}
      <div className="admin-lista">
        {sessoes.map(s => (
          <div key={s.id} className="admin-card">
            <h3>{s.filme}</h3>

            <p className="admin-info">
              {s.data} • {s.horario} • Sala {s.sala}
            </p>

            <p className="admin-disponiveis">
              Cadeiras restantes: {s.cadeiras_disponiveis}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
