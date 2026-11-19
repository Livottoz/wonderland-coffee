
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { protegerAdmin } = require('../middlewares/authMiddleware');


router.use(protegerAdmin);

// READ 
router.get('/produtos', adminController.listarProdutos);

// CREATE
router.get('/produtos/novo', adminController.formNovoProduto);
router.post('/produtos', adminController.criarProduto);

// UPDATE 
router.get('/produtos/editar/:id', adminController.formEditarProduto);
router.post('/produtos/editar/:id', adminController.atualizarProduto);

// DELETE 
router.post('/produtos/excluir/:id', adminController.excluirProduto);


//
// CRUD DA LIVRARIA
//

// READ - Listar todos os livros
router.get('/livros', adminController.listarLivros);

// CREATE - Formulário de cadastro
router.get('/livros/novo', adminController.formNovoLivro);

// CREATE - Salvar novo livro
router.post('/livros', adminController.criarLivro);

// UPDATE - Formulário de edição
router.get('/livros/editar/:id', adminController.formEditarLivro);

// UPDATE - Salvar alterações
router.post('/livros/editar/:id', adminController.atualizarLivro);

// DELETE - Excluir livro
router.post('/livros/excluir/:id', adminController.excluirLivro);


module.exports = router;
