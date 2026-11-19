# Wonderland Coffee ☕📚

Site simples de cafeteria e livraria feito com **Node.js + Express + EJS + CSS + JavaScript** (padrão MVC).

## Como rodar

```bash
npm install
npm start
```

Abra **http://localhost:3000** no navegador.

## Rotas

| Rota        | Página              |
|-------------|---------------------|
| `/`         | Página inicial      |
| `/cardapio` | Cardápio (tabelas por categoria) |
| `/livros`   | Livros (com busca)  |

## Estrutura

```
wonderland-coffee/
├── app.js                          → servidor Express
├── routes/rotas.js                 → todas as rotas
├── controllers/
│   ├── homeController.js
│   ├── cardapioController.js
│   └── livrosController.js
├── models/
│   ├── cardapioModel.js            → itens do cardápio (array)
│   └── livrosModel.js              → livros (array)
├── views/
│   ├── home.ejs
│   ├── cardapio.ejs
│   ├── livros.ejs
│   └── partials/header.ejs e footer.ejs
└── public/
    ├── css/style.css
    └── js/script.js                → menu do celular e busca de livros
```

## Como adicionar um item

Abra o model (`models/cardapioModel.js` ou `models/livrosModel.js`) e
adicione um objeto novo no array. A página atualiza sozinha.

Se a categoria do cardápio for nova (ex: `'Salgados'`), a tabela dela
é criada automaticamente.
