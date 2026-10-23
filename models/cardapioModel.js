// Model do cardápio
// Por enquanto os dados ficam em um array.
// Depois dá para trocar por uma tabela no SQLite sem mexer nas views.

const itens = [
  { id: 1, nome: 'Espresso', descricao: 'Café puro e encorpado', preco: 7.0, categoria: 'Cafés' },
  { id: 2, nome: 'Cappuccino', descricao: 'Café, leite vaporizado e canela', preco: 12.0, categoria: 'Cafés' },
  { id: 3, nome: 'Café do Chapeleiro', descricao: 'Espresso duplo com chantilly', preco: 14.5, categoria: 'Cafés' },
  { id: 4, nome: 'Chá do Desaniversário', descricao: 'Hibisco com maçã', preco: 10.0, categoria: 'Chás' },
  { id: 5, nome: 'Chá da Rainha', descricao: 'Chá preto com frutas vermelhas', preco: 11.0, categoria: 'Chás' },
  { id: 6, nome: 'Bolo Red Velvet', descricao: 'Fatia com cobertura de cream cheese', preco: 18.0, categoria: 'Doces' },
  { id: 7, nome: 'Cookie "Coma-me"', descricao: 'Chocolate com flor de sal', preco: 8.0, categoria: 'Doces' },
  { id: 8, nome: 'Torta de Morango', descricao: 'Massa amanteigada e morangos frescos', preco: 16.0, categoria: 'Doces' }
];

// Retorna todos os itens
function listarTodos() {
  return itens;
}

// Retorna a lista de categorias sem repetir
function listarCategorias() {
  const categorias = [];
  itens.forEach(function (item) {
    if (!categorias.includes(item.categoria)) {
      categorias.push(item.categoria);
    }
  });
  return categorias;
}

module.exports = { listarTodos, listarCategorias };
