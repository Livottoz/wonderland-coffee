
function protegerAdmin(req, res, next) {
  if (!req.session || !req.session.usuario) {
    return res.status(401).send(
      'Acesso negado. Faça login para continuar.'
    );
  }

  if (req.session.usuario.tipo !== 'funcionario') {
    return res.status(403).send(
      'Acesso permitido apenas para funcionários.'
    );
  }

  next();
}

module.exports = { protegerAdmin };
