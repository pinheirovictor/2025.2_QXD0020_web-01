import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    role: "user"
  });

  const [toast, setToast] = useState(null); // { type, message }
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/signup", form);

      setToast({
        type: "success",
        message: "Cadastro realizado com sucesso!"
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      setToast({
        type: "error",
        message: "Erro ao cadastrar. Verifique os dados."
      });

      setTimeout(() => {
        setToast(null);
      }, 3000);
    }
  }

  return (
    <div className="signup-container">
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>🎬 Cinema App</h2>
        <p className="signup-subtitle">Crie sua conta</p>

        <input
          type="text"
          placeholder="Nome"
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={e => setForm({ ...form, senha: e.target.value })}
          required
        />

        <button type="submit">Cadastrar</button>

        <p className="signup-footer">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </form>
    </div>
  );
}
