import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./SessaoDetalhe.css";

export default function SessaoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sessao, setSessao] = useState(null);
  const [assentosDisponiveis, setAssentosDisponiveis] = useState([]);
  const [assentoSelecionado, setAssentoSelecionado] = useState(null);

  useEffect(() => {
    api.get(`/sessoes/${id}`).then(res => {
      const sessaoData = res.data;
      setSessao(sessaoData);

      const assentos = Array.from(
        { length: sessaoData.cadeiras_disponiveis },
        (_, i) => i + 1
      );
      setAssentosDisponiveis(assentos);
    });
  }, [id]);

  async function comprar() {
    await api.post("/comprar", {
      sessao_id: sessao.id,
      quantidade: 1
    });

    navigate("/");
  }

  if (!sessao) {
    return (
      <div className="sessao-container">
        <p>Carregando sessão...</p>
      </div>
    );
  }

  return (
    <div className="sessao-container">
      <div className="sessao-card">
        <h2>{sessao.filme}</h2>

        <p className="sessao-info">
          Sala {sessao.sala} • {sessao.data} • {sessao.horario}
        </p>

        <p className="sessao-disponiveis">
          Cadeiras disponíveis: {sessao.cadeiras_disponiveis}
        </p>

        <h3>Escolha seu assento</h3>

        <div className="assentos-grid">
          {assentosDisponiveis.map(numero => (
            <button
              key={numero}
              className={
                assentoSelecionado === numero
                  ? "assento selecionado"
                  : "assento"
              }
              onClick={() => setAssentoSelecionado(numero)}
            >
              {numero}
            </button>
          ))}
        </div>

        <button
          className="comprar-btn"
          disabled={!assentoSelecionado}
          onClick={comprar}
        >
          Comprar ingresso
        </button>
      </div>
    </div>
  );
}
