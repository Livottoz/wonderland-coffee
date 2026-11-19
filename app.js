
require('dotenv').config();

// Importações
const express = require('express');
const path = require('path');
const session = require('express-session');

const adminRoutes = require('./routes/adminRoutes');
const rotas = require('./routes/rotas');

const app = express();
const PORTA = process.env.PORT || 3000;

// Configura o EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Permite receber dados dos formulários
app.use(express.urlencoded({ extended: true }));

// Arquivos públicos (CSS, JS e imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Configuração das sessões
if (!process.env.SESSION_SECRET) {
  throw new Error('Configure SESSION_SECRET no arquivo .env');
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 2
  }
}));

// Rotas administrativas
app.use('/admin', adminRoutes);

// Rotas públicas
app.use('/', rotas);

// Inicia o servidor
app.listen(PORTA, () => {
  console.log(
    'Servidor rodando em http://localhost:' + PORTA
  );
});
