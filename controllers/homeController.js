// Controller da página inicial
exports.index = (req, res) => {
  res.render('home', {
    titulo: 'Wonderland Coffee',
    pagina: 'home'
  });
};
