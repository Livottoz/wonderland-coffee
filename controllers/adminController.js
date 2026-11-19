
const cardapioModel = require('../models/cardapioModel');
const livrosModel = require('../models/livrosModel');

// READ - Listar produtos no painel
exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await cardapioModel.listarTodos();

    res.render('admin/produtos', {
      titulo: 'Gerenciar Produtos',
      produtos
    });
  } catch (erro) {
    console.error('Erro ao listar produtos:', erro);
    res.status(500).send('Erro ao carregar produtos.');
  }
};

// CREATE - Mostrar formulário
exports.formNovoProduto = (req, res) => {
  res.render('admin/novoProduto', {
    titulo: 'Cadastrar Produto'
  });
};

// CREATE - Salvar novo produto
exports.criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque } = req.body;

    const precoNumero = Number(preco);
    const estoqueNumero = Number(estoque);

    if (
      !nome?.trim() ||
      !Number.isFinite(precoNumero) ||
      precoNumero < 0 ||
      !Number.isInteger(estoqueNumero) ||
      estoqueNumero < 0 ||
      preco === '' ||
      estoque === ''
    ) {
      return res.status(400).send(
        'Preencha os campos corretamente.'
      );
    }

    await cardapioModel.cadastrar(
      nome.trim(),
      descricao || '',
      precoNumero,
      estoqueNumero
    );

    res.redirect('/admin/produtos');
  } catch (erro) {
    console.error('Erro ao cadastrar:', erro);
    res.status(500).send('Erro ao cadastrar produto.');
  }
};

// UPDATE - Mostrar formulário de edição
exports.formEditarProduto = async (req, res) => {
  try {
    const produto = await cardapioModel.buscarPorId(
      req.params.id
    );

    if (!produto) {
      return res.status(404).send('Produto não encontrado.');
    }

    res.render('admin/editarProduto', {
      titulo: 'Editar Produto',
      produto
    });
  } catch (erro) {
    console.error('Erro ao buscar produto:', erro);
    res.status(500).send('Erro ao carregar produto.');
  }
};

// UPDATE - Salvar alterações
exports.atualizarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque } = req.body;

    const precoNumero = Number(preco);
    const estoqueNumero = Number(estoque);

    if (
      !nome?.trim() ||
      !Number.isFinite(precoNumero) ||
      precoNumero < 0 ||
      !Number.isInteger(estoqueNumero) ||
      estoqueNumero < 0 ||
      preco === '' ||
      estoque === ''
    ) {
      return res.status(400).send('Dados inválidos.');
    }

    const alterados = await cardapioModel.atualizar(
      req.params.id,
      nome.trim(),
      descricao || '',
      precoNumero,
      estoqueNumero
    );

    if (!alterados) {
      return res.status(404).send('Produto não encontrado.');
    }

    res.redirect('/admin/produtos');
  } catch (erro) {
    console.error('Erro ao atualizar:', erro);
    res.status(500).send('Erro ao atualizar produto.');
  }
};

// DELETE - Excluir produto
exports.excluirProduto = async (req, res) => {
  try {
    const excluidos = await cardapioModel.excluir(
      req.params.id
    );

    if (!excluidos) {
      return res.status(404).send('Produto não encontrado.');
    }

    res.redirect('/admin/produtos');
  } catch (erro) {
    console.error('Erro ao excluir:', erro);

    if (erro.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).send(
        'Este produto pertence a um pedido e não pode ser excluído.'
      );
    }

    res.status(500).send('Erro ao excluir produto.');
  }
};


//
// CRUD DA LIVRARIA
//

// READ - Listar livros
exports.listarLivros = async (req, res) => {
  try {
    const livros = await livrosModel.listarTodos();

    res.render('admin/livros', {
      titulo: 'Gerenciar Livros',
      livros
    });
  } catch (erro) {
    console.error('Erro ao listar livros:', erro);
    res.status(500).send('Erro ao carregar livros.');
  }
};

// CREATE - Mostrar formulário
exports.formNovoLivro = (req, res) => {
  res.render('admin/novoLivro', {
    titulo: 'Cadastrar Livro'
  });
};

// Validação dos dados recebidos
function validarLivro(dados) {
  const { titulo, autor, isbn, preco, estoque } = dados;

  const precoNumero = Number(preco);
  const estoqueNumero = Number(estoque);

  if (
    typeof titulo !== 'string' ||
    !titulo.trim() ||
    titulo.trim().length > 200 ||
    typeof autor !== 'string' ||
    !autor.trim() ||
    autor.trim().length > 150 ||
    (isbn && (typeof isbn !== 'string' || isbn.length > 20)) ||
    preco === undefined ||
    preco === '' ||
    !Number.isFinite(precoNumero) ||
    precoNumero < 0 ||
    Math.round(precoNumero * 100) !== precoNumero * 100 ||
    estoque === undefined ||
    estoque === '' ||
    !Number.isInteger(estoqueNumero) ||
    estoqueNumero < 0
  ) {
    return null;
  }

  return {
    titulo: titulo.trim(),
    autor: autor.trim(),
    isbn: isbn?.trim() || null,
    preco: precoNumero,
    estoque: estoqueNumero
  };
}

// CREATE - Salvar livro
exports.criarLivro = async (req, res) => {
  const livro = validarLivro(req.body);

  if (!livro) {
    return res.status(400).send('Dados do livro inválidos.');
  }

  try {
    await livrosModel.cadastrar(
      livro.titulo,
      livro.autor,
      livro.isbn,
      livro.preco,
      livro.estoque
    );

    res.redirect('/admin/livros');
  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).send(
        'Já existe um livro cadastrado com esse ISBN.'
      );
    }

    console.error('Erro ao cadastrar livro:', erro);
    res.status(500).send('Erro ao cadastrar livro.');
  }
};

// UPDATE - Mostrar formulário de edição
exports.formEditarLivro = async (req, res) => {
  try {
    const livro = await livrosModel.buscarPorId(req.params.id);

    if (!livro) {
      return res.status(404).send('Livro não encontrado.');
    }

    res.render('admin/editarLivro', {
      titulo: 'Editar Livro',
      livro
    });
  } catch (erro) {
    console.error('Erro ao buscar livro:', erro);
    res.status(500).send('Erro ao carregar livro.');
  }
};

// UPDATE - Salvar alterações
exports.atualizarLivro = async (req, res) => {
  const livro = validarLivro(req.body);

  if (!livro) {
    return res.status(400).send('Dados do livro inválidos.');
  }

  try {
    const alterados = await livrosModel.atualizar(
      req.params.id,
      livro.titulo,
      livro.autor,
      livro.isbn,
      livro.preco,
      livro.estoque
    );

    if (!alterados) {
      return res.status(404).send('Livro não encontrado.');
    }

    res.redirect('/admin/livros');
  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).send(
        'Já existe um livro cadastrado com esse ISBN.'
      );
    }

    console.error('Erro ao atualizar livro:', erro);
    res.status(500).send('Erro ao atualizar livro.');
  }
};

// DELETE - Excluir livro
exports.excluirLivro = async (req, res) => {
  try {
    const excluidos = await livrosModel.excluir(req.params.id);

    if (!excluidos) {
      return res.status(404).send('Livro não encontrado.');
    }

    res.redirect('/admin/livros');
  } catch (erro) {
    if (erro.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).send(
        'Este livro está associado a um pedido e não pode ser excluído.'
      );
    }

    console.error('Erro ao excluir livro:', erro);
    res.status(500).send('Erro ao excluir livro.');
  }
};

