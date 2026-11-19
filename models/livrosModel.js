
const db = require('../db');

// READ - Listar todos os livros
async function listarTodos() {
  const [livros] = await db.query(`
    SELECT
      id_livro AS id,
      titulo,
      autor,
      isbn,
      preco,
      estoque
    FROM Livraria
    ORDER BY titulo
  `);

  return livros;
}

// READ - Buscar livro pelo ID
async function buscarPorId(id) {
  const [livros] = await db.execute(
    'SELECT * FROM Livraria WHERE id_livro = ?',
    [id]
  );

  return livros[0] || null;
}

// CREATE - Cadastrar livro
async function cadastrar(titulo, autor, isbn, preco, estoque) {
  const [resultado] = await db.execute(
    `INSERT INTO Livraria
     (titulo, autor, isbn, preco, estoque)
     VALUES (?, ?, ?, ?, ?)`,
    [titulo, autor, isbn || null, preco, estoque]
  );

  return resultado.insertId;
}

// UPDATE - Atualizar livro
async function atualizar(id, titulo, autor, isbn, preco, estoque) {
  const [resultado] = await db.execute(
    `UPDATE Livraria
     SET titulo = ?, autor = ?, isbn = ?,
         preco = ?, estoque = ?
     WHERE id_livro = ?`,
    [titulo, autor, isbn || null, preco, estoque, id]
  );

  return resultado.affectedRows;
}

// DELETE - Excluir livro
async function excluir(id) {
  const [resultado] = await db.execute(
    'DELETE FROM Livraria WHERE id_livro = ?',
    [id]
  );

  return resultado.affectedRows;
}

module.exports = {
  listarTodos,
  buscarPorId,
  cadastrar,
  atualizar,
  excluir
};
