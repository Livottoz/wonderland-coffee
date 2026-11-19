// Arquivo principal do servidor
const express = require('express');
const path = require('path');

const app = express();
const PORTA = 3000;

// Configura o EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos públicos (CSS, JS e imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const rotas = require('./routes/rotas');
app.use('/', rotas);

app.listen(PORTA, () => {
  console.log('Servidor rodando em http://localhost:' + PORTA);
});
