const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const cardapioController = require('../controllers/cardapioController');
const livrosController = require('../controllers/livrosController');

// Página inicial
router.get('/', homeController.index);

// Página do cardápio
router.get('/cardapio', cardapioController.listar);

// Página dos livros
router.get('/livros', livrosController.listar);

module.exports = router;
