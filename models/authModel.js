
const db = require('../db');

// Busca uma conta pelo e-mail e identifica
// se pertence a um cliente ou funcionário.
async function buscarPorEmail(email) {
  const [resultados] = await db.execute(
    `SELECT
       c.id_cadastro,
       c.nome,
       c.email,
       c.senha_hash,
       u.id_usuario,
       f.id_funcionario,
       f.cargo
     FROM Cadastro c
     LEFT JOIN Usuario u
       ON u.id_cadastro = c.id_cadastro
     LEFT JOIN Funcionario f
       ON f.id_cadastro = c.id_cadastro
     WHERE c.email = ?
     LIMIT 1`,
    [email]
  );

  return resultados[0] || null;
}

// Cadastra um cliente com senha já protegida
// pelo bcrypt no controller.
async function cadastrarCliente(nome, email, senhaHash) {
  const conexao = await db.getConnection();

  try {
    await conexao.beginTransaction();

    const [resultado] = await conexao.execute(
      `INSERT INTO Cadastro
       (nome, email, senha_hash)
       VALUES (?, ?, ?)`,
      [nome, email, senhaHash]
    );

    await conexao.execute(
      `INSERT INTO Usuario (id_cadastro)
       VALUES (?)`,
      [resultado.insertId]
    );

    await conexao.commit();
    return resultado.insertId;

  } catch (erro) {
    await conexao.rollback();
    throw erro;
  } finally {
    conexao.release();
  }
}

module.exports = {
  buscarPorEmail,
  cadastrarCliente
};
