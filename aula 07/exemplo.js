async function carregarUsuarios() {
  try {
    const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
    const usuarios = await resposta.json();
    usuarios.forEach(u => console.log(u.name));
  } catch (erro) {
    console.error('Erro ao carregar usuários:', erro);
  }
}

carregarUsuarios();
