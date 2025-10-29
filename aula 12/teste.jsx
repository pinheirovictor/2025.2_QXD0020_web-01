{
  usuarios
    .filter(u => u.ativo)
  .map(u => (
    <li key={u.id}>{u.nome}</li>
  ))
}
