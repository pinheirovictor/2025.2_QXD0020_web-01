import { Link } from "react-router-dom";

const destinos = [
  { id: 1, nome: "Paris", pais: "França" },
  { id: 2, nome: "Tóquio", pais: "Japão" },
  { id: 3, nome: "Rio de Janeiro", pais: "Brasil" },
];

export default function Home() {
  return (
    <div>
      <h2>Destinos Populares</h2>
      <ul>
        {destinos.map((d) => (
          <li key={d.id}>
            <Link to={`/destino/${d.id}`}>{d.nome} ({d.pais})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
