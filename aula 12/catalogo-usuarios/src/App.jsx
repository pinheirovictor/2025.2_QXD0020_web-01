import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!resposta.ok) throw new Error("Falha ao carregar usuários");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (e) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    }
    carregarUsuarios();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Catálogo de Usuários</h1>

      {carregando && <p>Carregando usuários...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <input
        type="text"
        placeholder="Buscar por nome..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "5px",
          width: "100%",
          maxWidth: "300px",
        }}
      />

      <ul>
        {usuarios
          .filter((u) => u.name.toLowerCase().includes(busca.toLowerCase()))
          .map((u) => (
            <li key={u.id} style={{ marginBottom: "10px" }}>
              <strong>{u.name}</strong>
              <br />
              Email: {u.email}
              <br />
              Cidade: {u.address.city}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;



// import { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [usuarios, setUsuarios] = useState([]);
//   const [carregando, setCarregando] = useState(true);
//   const [erro, setErro] = useState(null);
//   const [busca, setBusca] = useState("");
//   const [cidadeFiltro, setCidadeFiltro] = useState("");

//   useEffect(() => {
//     async function carregarUsuarios() {
//       try {
//         const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
//         if (!resposta.ok) throw new Error("Falha ao carregar usuários");
//         const dados = await resposta.json();
//         setUsuarios(dados);
//       } catch (e) {
//         setErro(e.message);
//       } finally {
//         setCarregando(false);
//       }
//     }
//     carregarUsuarios();
//   }, []);

//   // 🔹 Extrair as cidades únicas da lista de usuários
//   const cidades = [...new Set(usuarios.map((u) => u.address.city))];

//   // 🔹 Aplicar filtros de busca e cidade
//   const usuariosFiltrados = usuarios.filter((u) => {
//     const nomeMatch = u.name.toLowerCase().includes(busca.toLowerCase());
//     const cidadeMatch = cidadeFiltro ? u.address.city === cidadeFiltro : true;
//     return nomeMatch && cidadeMatch;
//   });

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Catálogo de Usuários</h1>

//       {carregando && <p>Carregando usuários...</p>}
//       {erro && <p style={{ color: "red" }}>{erro}</p>}

//       {/* 🔹 Campo de busca */}
//       <input
//         type="text"
//         placeholder="Buscar por nome..."
//         value={busca}
//         onChange={(e) => setBusca(e.target.value)}
//         style={{
//           marginBottom: "10px",
//           padding: "5px",
//           width: "100%",
//           maxWidth: "300px",
//           display: "block",
//         }}
//       />

//       {/* 🔹 Filtro por cidade */}
//       <select
//         value={cidadeFiltro}
//         onChange={(e) => setCidadeFiltro(e.target.value)}
//         style={{
//           marginBottom: "20px",
//           padding: "5px",
//           width: "100%",
//           maxWidth: "300px",
//           display: "block",
//         }}
//       >
//         <option value="">Todas as cidades</option>
//         {cidades.map((cidade) => (
//           <option key={cidade} value={cidade}>
//             {cidade}
//           </option>
//         ))}
//       </select>

//       {/* 🔹 Contador de usuários */}
//       {!carregando && (
//         <p style={{ marginBottom: "10px" }}>
//           Exibindo {usuariosFiltrados.length} de {usuarios.length} usuários
//         </p>
//       )}

//       {/* 🔹 Lista de usuários filtrados */}
//       {usuariosFiltrados.length > 0 ? (
//         <ul>
//           {usuariosFiltrados.map((u) => (
//             <li key={u.id} style={{ marginBottom: "10px" }}>
//               <strong>{u.name}</strong>
//               <br />
//               Email: {u.email}
//               <br />
//               Cidade: {u.address.city}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         // 🔹 Mensagem se não houver resultados
//         !carregando && <p>Nenhum resultado para esta busca.</p>
//       )}
//     </div>
//   );
// }

// export default App;
