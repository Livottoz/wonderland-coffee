const livrosModel = require('../models/livrosModel');

// Controller dos livros
exports.listar = (req, res) => {
  const livros = livrosModel.listarTodos();

  res.render('livros', {
    titulo: 'Livros - Wonderland Coffee',
    pagina: 'livros',
    livros: livros
  });
};
