
const bcrypt = require('bcrypt');
const authModel = require('../models/authModel');

// Exibir formulário de login
exports.formLogin = (req, res) => {
  res.render('login', {
    titulo: 'Login - Wonderland Coffee',
    erro: null
  });
};

// Realizar login
exports.login = async (req, res, next) => {
  try {
    const email = String(req.body.email || '')
      .trim()
      .toLowerCase();

    const senha = req.body.senha;

    if (!email || typeof senha !== 'string' || !senha) {
      return res.status(400).render('login', {
        titulo: 'Login - Wonderland Coffee',
        erro: 'Informe seu e-mail e senha.'
      });
    }

    const conta = await authModel.buscarPorEmail(email);

    const senhaCorreta = conta
      ? await bcrypt.compare(senha, conta.senha_hash)
      : false;

    if (!conta || !senhaCorreta) {
      return res.status(401).render('login', {
        titulo: 'Login - Wonderland Coffee',
        erro: 'E-mail ou senha incorretos.'
      });
    }

    // Tipo de usuário definido pelo banco, não pelo formulário
    const tipo = conta.id_funcionario
      ? 'funcionario'
      : 'cliente';

    // Cria um novo identificador de sessão após o login
    req.session.regenerate(erro => {
      if (erro) return next(erro);

      req.session.usuario = {
        id: conta.id_cadastro,
        nome: conta.nome,
        tipo: tipo
      };

      req.session.save(erro => {
        if (erro) return next(erro);

        if (tipo === 'funcionario') {
          return res.redirect('/admin/produtos');
        }

        return res.redirect('/');
      });
    });

  } catch (erro) {
    next(erro);
  }
};

// Exibir formulário de cadastro
exports.formCadastro = (req, res) => {
  res.render('cadastro', {
    titulo: 'Cadastro - Wonderland Coffee',
    erro: null
  });
};

// Cadastrar cliente
exports.cadastrar = async (req, res, next) => {
  try {
    const nome = String(req.body.nome || '').trim();
    const email = String(req.body.email || '')
      .trim()
      .toLowerCase();
    const senha = req.body.senha;

    if (
      !nome ||
      nome.length > 100 ||
      !email ||
      email.length > 150 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof senha !== 'string' ||
      senha.length < 8 ||
      Buffer.byteLength(senha, 'utf8') > 72
    ) {
      return res.status(400).render('cadastro', {
        titulo: 'Cadastro - Wonderland Coffee',
        erro: 'Verifique os dados. A senha deve ter pelo menos 8 caracteres.'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    await authModel.cadastrarCliente(
      nome,
      email,
      senhaHash
    );

    return res.redirect('/login');

  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).render('cadastro', {
        titulo: 'Cadastro - Wonderland Coffee',
        erro: 'Este e-mail já está cadastrado.'
      });
    }

    next(erro);
  }
};

// Encerrar sessão
exports.logout = (req, res, next) => {
  req.session.destroy(erro => {
    if (erro) return next(erro);

    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};
