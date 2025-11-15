import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../api/api";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [backup, setBackup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [busca, setBusca] = useState("");
  const [cidade, setCidade] = useState("");

  async function carregar() {
    setLoading(true);
    setErro(false);
    try {
      const data = await getUsers();
      setUsers(data);
      setBackup(data);
    } catch (error) {
      setErro(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    carregar();
  }, []);

  // cidades dinâmicas (filtro)
  const cidades = [...new Set(backup.map(u => u.address.city))];

  // busca + filtro
  const filtrados = users.filter(u => {
    const texto = busca.toLowerCase();
    const matchBusca =
      u.name.toLowerCase().includes(texto) ||
      u.email.toLowerCase().includes(texto);

    const matchCidade = cidade ? u.address.city === cidade : true;

    return matchBusca && matchCidade;
  });

  return (
    <div>
      <h2>Lista de Usuários</h2>

      {loading && <p>Carregando usuários...</p>}
      {erro && (
        <div>
          <p>Erro ao carregar usuários.</p>
          <button onClick={carregar}>Tentar novamente</button>
        </div>
      )}

      {!loading && !erro && (
        <>
          {/* Busca */}
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />

          {/* Filtro */}
          <select value={cidade} onChange={e => setCidade(e.target.value)}>
            <option value="">Todas as cidades</option>
            {cidades.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <p>
            Exibindo {filtrados.length} de {backup.length} usuários
          </p>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Cidade</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((u, idx) => (
                <tr key={u.id} className={idx % 2 === 0 ? "linha-par" : "linha-impar"}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.address.city}</td>
                  <td>
                    <Link to={`/usuario/${u.id}`}>
                      <button>Ver detalhes</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
