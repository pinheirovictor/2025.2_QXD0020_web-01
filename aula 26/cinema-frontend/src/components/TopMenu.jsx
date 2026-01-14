import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./TopMenu.css";

export default function TopMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="topmenu">
      <div className="topmenu-logo">
        🎬 Cinema App
      </div>

      <nav className="topmenu-nav">
        <Link to="/">Sessões</Link>

        {user.role === "user" && (
          <Link to="/minhas-compras">Meus Ingressos</Link>
        )}

        {user.role === "admin" && (
          <Link to="/criar-sessao">Criar Sessão</Link>
        )}
      </nav>

      <div className="topmenu-user">
        <span className="topmenu-email">{user.email}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
