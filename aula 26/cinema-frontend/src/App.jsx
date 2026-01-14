import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";

// Usuário
import SessaoDetalhe from "./user/SessaoDetalhe.jsx";
// import CompraSucesso from "./user/CompraSucesso.jsx";
import MinhasCompras from "./pages/MinhasCompras.jsx";

// Admin
import CriarSessao from "./pages/CriarSessao.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Home decide fluxo por role */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* Usuário escolhe assento */}
          <Route
            path="/sessao/:id"
            element={
              <PrivateRoute>
                <SessaoDetalhe />
              </PrivateRoute>
            }
          />

          {/* Minhas compras */}
          <Route
            path="/minhas-compras"
            element={
              <PrivateRoute>
                <MinhasCompras />
              </PrivateRoute>
            }
          />

          {/* <Route
            path="/compra-sucesso"
            element={
              <PrivateRoute>
                <CompraSucesso />
              </PrivateRoute>
            }
          /> */}

          {/* Admin */}
          <Route
            path="/criar-sessao"
            element={
              <PrivateRoute role="admin">
                <CriarSessao />
              </PrivateRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
