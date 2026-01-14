import { createContext, useContext, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  async function login(email, senha) {
    const res = await api.post("/login", { email, senha });
    localStorage.setItem("token", res.data.access_token);

    const payload = JSON.parse(atob(res.data.access_token.split(".")[1]));
    localStorage.setItem("user", JSON.stringify(payload));
    setUser(payload);
  }

  function logout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
