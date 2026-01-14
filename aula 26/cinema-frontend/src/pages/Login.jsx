import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [toast, setToast] = useState(null); // { type, message }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(email, senha);

      setToast({ type: "success", message: "Login realizado com sucesso!" });

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      setToast({ type: "error", message: "Email ou senha inválidos." });

      setTimeout(() => {
        setToast(null);
      }, 3000);
    }
  }

  return (
    <div className="login-container">
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      <form className="login-card" onSubmit={handleSubmit}>
        <h2>🎬 Cinema App</h2>
        <p className="login-subtitle">Acesse sua conta</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>

        <p className="login-footer">
          Não tem conta? <Link to="/signup">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}
