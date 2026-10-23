// Model dos livros
// Por enquanto os dados ficam em um array.

const livros = [
  { id: 1, titulo: 'Alice no País das Maravilhas', autor: 'Lewis Carroll', genero: 'Clássico', preco: 39.9 },
  { id: 2, titulo: 'Alice Através do Espelho', autor: 'Lewis Carroll', genero: 'Clássico', preco: 42.9 },
  { id: 3, titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', genero: 'Infantojuvenil', preco: 29.9 },
  { id: 4, titulo: 'Dom Casmurro', autor: 'Machado de Assis', genero: 'Clássico', preco: 24.9 },
  { id: 5, titulo: 'O Hobbit', autor: 'J. R. R. Tolkien', genero: 'Fantasia', preco: 54.9 },
  { id: 6, titulo: 'Orgulho e Preconceito', autor: 'Jane Austen', genero: 'Romance', preco: 34.9 }
];

function listarTodos() {
  return livros;
}

module.exports = { listarTodos };
