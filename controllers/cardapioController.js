
const cardapioModel = require('../models/cardapioModel');

// Controller do cardápio integrado ao MySQL
exports.listar = async (req, res) => {
  try {
    const produtos = await cardapioModel.listarTodos();

    const itens = produtos.map(produto => ({
      ...produto,
      preco: Number(produto.preco),
      categoria: 'Produtos'
    }));

    res.render('cardapio', {
      titulo: 'Cardápio - Wonderland Coffee',
      pagina: 'cardapio',
      itens: itens,
      categorias: ['Produtos']
    });

  } catch (erro) {
    console.error('Erro ao carregar cardápio:', erro.message);

    res.status(500).send(
      'Não foi possível carregar o cardápio.'
    );
  }
};
