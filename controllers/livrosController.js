
const livrosModel = require('../models/livrosModel');

// Controller da livraria integrado ao MySQL
exports.listar = async (req, res) => {
  try {
    const resultado = await livrosModel.listarTodos();

    const livros = resultado.map(livro => ({
      ...livro,
      preco: Number(livro.preco),
      genero: 'Literatura'
    }));

    res.render('livros', {
      titulo: 'Livros - Wonderland Coffee',
      pagina: 'livros',
      livros: livros
    });

  } catch (erro) {
    console.error('Erro ao carregar livros:', erro.message);

    res.status(500).send(
      'Não foi possível carregar os livros.'
    );
  }
};
