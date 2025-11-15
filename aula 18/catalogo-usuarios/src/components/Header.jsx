import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <h1>Catálogo Avançado de Usuários</h1>

      <nav>
        <NavLink to="/" className="link">Início</NavLink>
        <NavLink to="/sobre" className="link">Sobre</NavLink>
      </nav>
    </header>
  );
}
