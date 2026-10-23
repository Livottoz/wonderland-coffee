const cardapioModel = require('../models/cardapioModel');

// Controller do cardápio
exports.listar = (req, res) => {
  const itens = cardapioModel.listarTodos();
  const categorias = cardapioModel.listarCategorias();

  res.render('cardapio', {
    titulo: 'Cardápio - Wonderland Coffee',
    pagina: 'cardapio',
    itens: itens,
    categorias: categorias
  });
};
