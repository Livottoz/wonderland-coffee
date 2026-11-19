
const db = require('./db');

async function testarConexao() {
  try {
    const [resultado] = await db.query('SHOW TABLES');

    console.log('✅ Conexão com o MySQL estabelecida!');
    console.log('Tabelas encontradas:');

    console.table(resultado);
  } catch (erro) {
    console.error('❌ Erro ao conectar:', erro.message);
  } finally {
    await db.end();
  }
}

testarConexao();
