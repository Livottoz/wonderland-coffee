
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Página de login
router.get('/login', authController.formLogin);

// Enviar dados do login
router.post('/login', authController.login);

// Página de cadastro
router.get('/cadastro', authController.formCadastro);

// Enviar dados do cadastro
router.post('/cadastro', authController.cadastrar);

// Encerrar sessão
router.post('/logout', authController.logout);

module.exports = router;
