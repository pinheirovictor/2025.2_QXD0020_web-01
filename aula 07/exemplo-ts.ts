interface Produto {
  nome: string;
  preco: number;
}

function criarProduto(nome: string, preco: number): Produto {
  return { nome, preco };
}

const p1 = criarProduto("Mouse", 89.90);
console.log(p1);
