-- Wonderland Coffee | queries.sql
-- Consultas de leitura para testar no MySQL Workbench e integrar ao Node.js/EJS.
-- Banco: cafeteria_livraria
-- Este arquivo NAO altera, insere ou exclui dados.

USE `cafeteria_livraria`;

-- 1. Cardapio completo: ordenacao alfabetica.
SELECT id_produto, nome, descricao, preco, estoque
FROM `Cafeteria`
ORDER BY nome ASC;

-- 2. Itens do cardapio disponiveis (filtro WHERE).
SELECT id_produto, nome, descricao, preco, estoque
FROM `Cafeteria`
WHERE estoque > 0
ORDER BY preco ASC, nome ASC;

-- 3. Catalogo completo da livraria.
SELECT id_livro, titulo, autor, isbn, preco, estoque
FROM `Livraria`
ORDER BY titulo ASC;

-- 4. Livros em estoque por menor preco.
SELECT id_livro, titulo, autor, preco, estoque
FROM `Livraria`
WHERE estoque > 0
ORDER BY preco ASC, titulo ASC;

-- 5. Pedidos com o nome e email de seus clientes (JOIN em 3 tabelas).
SELECT p.id_pedido, c.nome AS cliente, c.email,
       p.data_pedido, p.status
FROM `Pedidos` AS p
INNER JOIN `Usuario` AS u ON u.id_usuario = p.id_usuario
INNER JOIN `Cadastro` AS c ON c.id_cadastro = u.id_cadastro
ORDER BY p.data_pedido DESC, p.id_pedido DESC;

-- 6. Detalhes dos pedidos: produtos da cafeteria OU livros.
-- LEFT JOIN permite consultar as duas categorias em uma mesma listagem.
SELECT i.id_item, i.id_pedido,
       CASE WHEN i.id_produto IS NOT NULL THEN 'Cafeteria' ELSE 'Livraria' END AS tipo,
       COALESCE(cf.nome, lv.titulo) AS item,
       i.quantidade, i.preco_unitario,
       i.quantidade * i.preco_unitario AS subtotal
FROM `Itens_Pedido` AS i
INNER JOIN `Pedidos` AS p ON p.id_pedido = i.id_pedido
LEFT JOIN `Cafeteria` AS cf ON cf.id_produto = i.id_produto
LEFT JOIN `Livraria` AS lv ON lv.id_livro = i.id_livro
ORDER BY i.id_pedido ASC, i.id_item ASC;

-- 7. Total por pedido: agregacao e agrupamento.
SELECT p.id_pedido, p.status, p.data_pedido,
       SUM(i.quantidade * i.preco_unitario) AS total_pedido
FROM `Pedidos` AS p
INNER JOIN `Itens_Pedido` AS i ON i.id_pedido = p.id_pedido
GROUP BY p.id_pedido, p.status, p.data_pedido
ORDER BY p.id_pedido ASC;

-- 8. Funcionarios e seus cargos.
SELECT f.id_funcionario, c.nome, c.email, f.cargo
FROM `Funcionario` AS f
INNER JOIN `Cadastro` AS c ON c.id_cadastro = f.id_cadastro
ORDER BY c.nome ASC;

-- 9. Pedidos pendentes, com filtro WHERE e JOIN.
SELECT p.id_pedido, c.nome AS cliente, p.data_pedido, p.status
FROM `Pedidos` AS p
INNER JOIN `Usuario` AS u ON u.id_usuario = p.id_usuario
INNER JOIN `Cadastro` AS c ON c.id_cadastro = u.id_cadastro
WHERE p.status = 'Pendente'
ORDER BY p.data_pedido ASC, p.id_pedido ASC;

-- 10. Historico de login por usuario (sem expor senha_hash).
SELECT l.id_login, c.nome, c.email, l.data_hora, l.sucesso
FROM `Login` AS l
INNER JOIN `Cadastro` AS c ON c.id_cadastro = l.id_cadastro
ORDER BY l.data_hora DESC, l.id_login DESC;
