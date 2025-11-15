import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import UserDetails from "./pages/UserDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuario/:id" element={<UserDetails />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
