// ===== MENU NO CELULAR =====
const botaoMenu = document.getElementById('botaoMenu');
const menu = document.getElementById('menu');

botaoMenu.addEventListener('click', function () {
  menu.classList.toggle('aberto');
});

// ===== BUSCA DE LIVROS =====
// Só roda na página /livros, porque é a única que tem o campo de busca
const busca = document.getElementById('busca');

if (busca) {
  const livros = document.querySelectorAll('.livro');
  const semResultado = document.getElementById('semResultado');

  busca.addEventListener('input', function () {
    const texto = busca.value.toLowerCase();
    let encontrados = 0;

    livros.forEach(function (livro) {
      const conteudo = livro.textContent.toLowerCase();

      if (conteudo.includes(texto)) {
        livro.style.display = 'block';
        encontrados++;
      } else {
        livro.style.display = 'none';
      }
    });

    // Mostra a mensagem se nenhum livro aparecer
    if (encontrados === 0) {
      semResultado.style.display = 'block';
    } else {
      semResultado.style.display = 'none';
    }
  });
}
