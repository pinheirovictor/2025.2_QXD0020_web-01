import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import "./CriarSessao.css";

export default function CriarSessao() {
  const [form, setForm] = useState({
    filme: "",
    sala: "",
    data: "",
    horario: "",
    total_cadeiras: ""
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    await api.post("/sessoes", {
      ...form,
      total_cadeiras: Number(form.total_cadeiras)
    });

    navigate("/");
  }

  return (
    <div className="criar-container">
      <form className="criar-card" onSubmit={handleSubmit}>
        <h2>🎬 Criar Nova Sessão</h2>

        <input
          placeholder="Nome do filme"
          value={form.filme}
          onChange={e => setForm({ ...form, filme: e.target.value })}
          required
        />

        <input
          placeholder="Sala"
          value={form.sala}
          onChange={e => setForm({ ...form, sala: e.target.value })}
          required
        />

        <input
          type="date"
          value={form.data}
          onChange={e => setForm({ ...form, data: e.target.value })}
          required
        />

        <input
          type="time"
          value={form.horario}
          onChange={e => setForm({ ...form, horario: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Total de cadeiras"
          value={form.total_cadeiras}
          onChange={e => setForm({ ...form, total_cadeiras: e.target.value })}
          required
          min={1}
        />

        <div className="criar-actions">
          <button type="submit">Criar sessão</button>

          <Link className="cancelar-link" to="/">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
