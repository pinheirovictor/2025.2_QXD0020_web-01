import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./SessoesUsuario.css";

export default function SessoesUsuario() {
  const [sessoes, setSessoes] = useState([]);

  useEffect(() => {
    api.get("/sessoes")
      .then(res => setSessoes(res.data));
  }, []);

  return (
    <div className="sessoes-container">
      {/* Cabeçalho */}
      <div className="sessoes-header">
        <h2>Sessões Disponíveis</h2>

        {/* <Link className="meus-ingressos-btn" to="/minhas-compras">
          Meus ingressos
        </Link> */}
      </div>

      {/* Estado vazio */}
      {sessoes.length === 0 && (
        <p className="sessoes-vazio">
          Nenhuma sessão disponível no momento.
        </p>
      )}

      {/* Lista de sessões */}
      <div className="sessoes-lista">
        {sessoes.map(s => (
          <div key={s.id} className="sessao-card">
            <h3>{s.filme}</h3>

            <p className="sessao-info">
              {s.data} • {s.horario}
            </p>

            <p className="sessao-disponiveis">
              Cadeiras disponíveis: {s.cadeiras_disponiveis}
            </p>

            <Link
              className="escolher-btn"
              to={`/sessao/${s.id}`}
            >
              Escolher assento
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
