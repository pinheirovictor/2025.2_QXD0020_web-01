const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("Erro ao buscar usuários");
  return res.json();
}

export async function getUser(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar usuário");
  return res.json();
}

export async function getPostsByUser(id) {
  const res = await fetch(`${BASE_URL}/users/${id}/posts`);
  if (!res.ok) throw new Error("Erro ao buscar posts");
  return res.json();
}
