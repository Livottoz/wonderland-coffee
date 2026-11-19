
const db = require('../db');

// READ - Listar todos os produtos
async function listarTodos() {
  const [produtos] = await db.query(`
    SELECT
      id_produto AS id,
      nome,
      descricao,
      preco,
      estoque
    FROM Cafeteria
    ORDER BY nome
  `);

  return produtos;
}

// READ - Buscar produto pelo ID
async function buscarPorId(id) {
  const [produtos] = await db.execute(
    'SELECT * FROM Cafeteria WHERE id_produto = ?',
    [id]
  );

  return produtos[0] || null;
}

// CREATE - Cadastrar produto
async function cadastrar(nome, descricao, preco, estoque) {
  const [resultado] = await db.execute(
    `INSERT INTO Cafeteria
     (nome, descricao, preco, estoque)
     VALUES (?, ?, ?, ?)`,
    [nome, descricao, preco, estoque]
  );

  return resultado.insertId;
}

// UPDATE - Atualizar produto
async function atualizar(id, nome, descricao, preco, estoque) {
  const [resultado] = await db.execute(
    `UPDATE Cafeteria
     SET nome = ?, descricao = ?, preco = ?, estoque = ?
     WHERE id_produto = ?`,
    [nome, descricao, preco, estoque, id]
  );

  return resultado.affectedRows;
}

// DELETE - Excluir produto
async function excluir(id) {
  const [resultado] = await db.execute(
    'DELETE FROM Cafeteria WHERE id_produto = ?',
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
