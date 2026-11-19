-- Wonderland Coffee | seeds.sql
-- Banco existente: cafeteria_livraria
-- DADOS FICTICIOS EXCLUSIVAMENTE PARA DESENVOLVIMENTO / AVALIACAO.
-- Execute UMA VEZ em banco vazio. O script nao recria tabelas.
-- Login de demonstracao (nao usar em producao): qualquer email de exemplo abaixo
-- Senha temporaria de todas as contas ficticias: WonderlandTeste2026!
-- Senhas sao inseridas como hashes bcrypt, nao em texto puro.
-- ATENCAO: testar localmente antes de hospedar e substituir/remover contas de teste antes da publicacao.
USE `cafeteria_livraria`;
START TRANSACTION;

-- 1) Cadastro: 10 pessoas (5 clientes e 5 funcionarios).
INSERT INTO `Cadastro` (`nome`, `email`, `senha_hash`) VALUES
  ('Ana Oliveira', 'ana.oliveira@example.com', '$2b$12$n5pGANip1TTJgkCiQloHTe8G2ndb8YufgnAFNOasgEfbNeukk3R5C'),
  ('Bruno Martins', 'bruno.martins@example.com', '$2b$12$n5pGANip1TTJgkCiQloHTe8G2ndb8YufgnAFNOasgEfbNeukk3R5C'),
  ('Carla Souza', 'carla.souza@example.com', '$2b$12$n5pGANip1TTJgkCiQloHTe8G2ndb8YufgnAFNOasgEfbNeukk3R5C'),
  ('Diego Lima', 'diego.lima@example.com', '$2b$12$n5pGANip1TTJgkCiQloHTe8G2ndb8YufgnAFNOasgEfbNeukk3R5C'),
  ('Elisa Rocha', 'elisa.rocha@example.com', '$2b$12$n5pGANip1TTJgkCiQloHTe8G2ndb8YufgnAFNOasgEfbNeukk3R5C'),
  ('Fernanda Alves', 'fernanda.alves@example.com', '$2b$12$n5pGANip1TTJgkCiQloHTe8G2ndb8YufgnAFNOasgEfbNeukk3R5C'),
  ('Gabriel Costa', 'gabriel.costa@example.com', '$2b$12$n5pGANip1TTJgkCiQloHTe8G2ndb8YufgnAFNOasgEfbNeukk3R5C'),
  ('Helena Ribeiro', 'helena.ribeiro@example.com', '$2b$12$n5pGANip1TTJgkCiQloHTe8G2ndb8YufgnAFNOasgEfbNeukk3R5C'),
  ('Igor Santos', 'igor.santos@example.com', '$2b$12$n5pGANip1TTJgkCiQloHTe8G2ndb8YufgnAFNOasgEfbNeukk3R5C'),
  ('Julia Pereira', 'julia.pereira@example.com', '$2b$12$n5pGANip1TTJgkCiQloHTe8G2ndb8YufgnAFNOasgEfbNeukk3R5C');

-- 2) Cafeteria: 8 produtos.
INSERT INTO `Cafeteria` (`nome`, `descricao`, `preco`, `estoque`) VALUES
  ('Espresso', 'Cafe curto e encorpado', 7.00, 40),
  ('Cappuccino', 'Cafe com leite vaporizado e espuma', 12.50, 30),
  ('Latte', 'Cafe espresso com leite', 13.00, 25),
  ('Mocha', 'Cafe com chocolate e leite', 15.00, 20),
  ('Cha de camomila', 'Infusao de camomila', 8.00, 28),
  ('Chocolate quente', 'Chocolate cremoso', 14.50, 20),
  ('Pao de queijo', 'Porcao de pao de queijo', 9.00, 35),
  ('Bolo de cenoura', 'Fatia com cobertura de chocolate', 11.00, 18);

-- 3) Livraria: 8 livros. ISBNs sao exemplos para testes; valide-os antes do uso real.
INSERT INTO `Livraria` (`titulo`, `autor`, `isbn`, `preco`, `estoque`) VALUES
  ('Alice no Pais das Maravilhas', 'Lewis Carroll', '9788537816893', 34.90, 12),
  ('O Pequeno Principe', 'Antoine de Saint-Exupery', '9788595081512', 29.90, 18),
  ('Dom Casmurro', 'Machado de Assis', '9788535914843', 32.00, 10),
  ('A Revolucao dos Bichos', 'George Orwell', '9788532532325', 39.90, 14),
  ('Orgulho e Preconceito', 'Jane Austen', '9788544001826', 44.90, 9),
  ('O Cortico', 'Aluisio Azevedo', '9788525406952', 27.90, 13),
  ('Capitaes da Areia', 'Jorge Amado', '9788535914844', 42.00, 11),
  ('Vidas Secas', 'Graciliano Ramos', '9788501067344', 36.90, 8);

-- 4) Usuario: cinco clientes associados aos seus cadastros.
INSERT INTO `Usuario` (`id_cadastro`)
SELECT `id_cadastro` FROM `Cadastro`
WHERE `email` IN ('ana.oliveira@example.com', 'bruno.martins@example.com', 'carla.souza@example.com', 'diego.lima@example.com', 'elisa.rocha@example.com');

-- 5) Funcionario: cinco funcionarios associados aos seus cadastros.
INSERT INTO `Funcionario` (`id_cadastro`, `cargo`) VALUES
  ((SELECT `id_cadastro` FROM `Cadastro` WHERE `email` = 'fernanda.alves@example.com'), 'Atendente'),
  ((SELECT `id_cadastro` FROM `Cadastro` WHERE `email` = 'gabriel.costa@example.com'), 'Barista'),
  ((SELECT `id_cadastro` FROM `Cadastro` WHERE `email` = 'helena.ribeiro@example.com'), 'Livreiro'),
  ((SELECT `id_cadastro` FROM `Cadastro` WHERE `email` = 'igor.santos@example.com'), 'Estoquista'),
  ((SELECT `id_cadastro` FROM `Cadastro` WHERE `email` = 'julia.pereira@example.com'), 'Gerente');

-- 6) Login: cinco eventos ficticios associados a contas existentes.
INSERT INTO `Login` (`id_cadastro`, `sucesso`) VALUES
  ((SELECT `id_cadastro` FROM `Cadastro` WHERE `email` = 'ana.oliveira@example.com'), 1),
  ((SELECT `id_cadastro` FROM `Cadastro` WHERE `email` = 'bruno.martins@example.com'), 1),
  ((SELECT `id_cadastro` FROM `Cadastro` WHERE `email` = 'carla.souza@example.com'), 1),
  ((SELECT `id_cadastro` FROM `Cadastro` WHERE `email` = 'diego.lima@example.com'), 1),
  ((SELECT `id_cadastro` FROM `Cadastro` WHERE `email` = 'elisa.rocha@example.com'), 1);

-- 7) Pedidos e 8) Itens_Pedido: cinco pedidos, cada um com dois itens.
-- LAST_INSERT_ID() evita pressupor que AUTO_INCREMENT comeca em 1.
-- Pedido 1
INSERT INTO `Pedidos` (`id_usuario`, `status`)
SELECT `u`.`id_usuario`, 'Pendente'
FROM `Usuario` AS `u` JOIN `Cadastro` AS `c` ON `u`.`id_cadastro` = `c`.`id_cadastro`
WHERE `c`.`email` = 'ana.oliveira@example.com';
SET @pedido1 = LAST_INSERT_ID();
INSERT INTO `Itens_Pedido` (`id_pedido`, `id_produto`, `id_livro`, `quantidade`, `preco_unitario`)
SELECT @pedido1, `id_produto`, NULL, 2, 7.00 FROM `Cafeteria` WHERE `nome` = 'Espresso';
INSERT INTO `Itens_Pedido` (`id_pedido`, `id_produto`, `id_livro`, `quantidade`, `preco_unitario`)
SELECT @pedido1, NULL, `id_livro`, 1, 34.90 FROM `Livraria` WHERE `titulo` = 'Alice no Pais das Maravilhas';

-- Pedido 2
INSERT INTO `Pedidos` (`id_usuario`, `status`)
SELECT `u`.`id_usuario`, 'Em preparo'
FROM `Usuario` AS `u` JOIN `Cadastro` AS `c` ON `u`.`id_cadastro` = `c`.`id_cadastro`
WHERE `c`.`email` = 'bruno.martins@example.com';
SET @pedido2 = LAST_INSERT_ID();
INSERT INTO `Itens_Pedido` (`id_pedido`, `id_produto`, `id_livro`, `quantidade`, `preco_unitario`)
SELECT @pedido2, `id_produto`, NULL, 1, 12.50 FROM `Cafeteria` WHERE `nome` = 'Cappuccino';
INSERT INTO `Itens_Pedido` (`id_pedido`, `id_produto`, `id_livro`, `quantidade`, `preco_unitario`)
SELECT @pedido2, `id_produto`, NULL, 2, 9.00 FROM `Cafeteria` WHERE `nome` = 'Pao de queijo';

-- Pedido 3
INSERT INTO `Pedidos` (`id_usuario`, `status`)
SELECT `u`.`id_usuario`, 'Concluido'
FROM `Usuario` AS `u` JOIN `Cadastro` AS `c` ON `u`.`id_cadastro` = `c`.`id_cadastro`
WHERE `c`.`email` = 'carla.souza@example.com';
SET @pedido3 = LAST_INSERT_ID();
INSERT INTO `Itens_Pedido` (`id_pedido`, `id_produto`, `id_livro`, `quantidade`, `preco_unitario`)
SELECT @pedido3, NULL, `id_livro`, 1, 29.90 FROM `Livraria` WHERE `titulo` = 'O Pequeno Principe';
INSERT INTO `Itens_Pedido` (`id_pedido`, `id_produto`, `id_livro`, `quantidade`, `preco_unitario`)
SELECT @pedido3, `id_produto`, NULL, 1, 13.00 FROM `Cafeteria` WHERE `nome` = 'Latte';

-- Pedido 4
INSERT INTO `Pedidos` (`id_usuario`, `status`)
SELECT `u`.`id_usuario`, 'Concluido'
FROM `Usuario` AS `u` JOIN `Cadastro` AS `c` ON `u`.`id_cadastro` = `c`.`id_cadastro`
WHERE `c`.`email` = 'diego.lima@example.com';
SET @pedido4 = LAST_INSERT_ID();
INSERT INTO `Itens_Pedido` (`id_pedido`, `id_produto`, `id_livro`, `quantidade`, `preco_unitario`)
SELECT @pedido4, NULL, `id_livro`, 1, 32.00 FROM `Livraria` WHERE `titulo` = 'Dom Casmurro';
INSERT INTO `Itens_Pedido` (`id_pedido`, `id_produto`, `id_livro`, `quantidade`, `preco_unitario`)
SELECT @pedido4, NULL, `id_livro`, 1, 39.90 FROM `Livraria` WHERE `titulo` = 'A Revolucao dos Bichos';

-- Pedido 5
INSERT INTO `Pedidos` (`id_usuario`, `status`)
SELECT `u`.`id_usuario`, 'Pendente'
FROM `Usuario` AS `u` JOIN `Cadastro` AS `c` ON `u`.`id_cadastro` = `c`.`id_cadastro`
WHERE `c`.`email` = 'elisa.rocha@example.com';
SET @pedido5 = LAST_INSERT_ID();
INSERT INTO `Itens_Pedido` (`id_pedido`, `id_produto`, `id_livro`, `quantidade`, `preco_unitario`)
SELECT @pedido5, `id_produto`, NULL, 2, 14.50 FROM `Cafeteria` WHERE `nome` = 'Chocolate quente';
INSERT INTO `Itens_Pedido` (`id_pedido`, `id_produto`, `id_livro`, `quantidade`, `preco_unitario`)
SELECT @pedido5, NULL, `id_livro`, 1, 44.90 FROM `Livraria` WHERE `titulo` = 'Orgulho e Preconceito';

COMMIT;

-- Conferencia: execute apos importar.
SELECT 'Cadastro' AS tabela, COUNT(*) AS total FROM `Cadastro`
UNION ALL SELECT 'Cafeteria', COUNT(*) FROM `Cafeteria`
UNION ALL SELECT 'Funcionario', COUNT(*) FROM `Funcionario`
UNION ALL SELECT 'Itens_Pedido', COUNT(*) FROM `Itens_Pedido`
UNION ALL SELECT 'Livraria', COUNT(*) FROM `Livraria`
UNION ALL SELECT 'Login', COUNT(*) FROM `Login`
UNION ALL SELECT 'Pedidos', COUNT(*) FROM `Pedidos`
UNION ALL SELECT 'Usuario', COUNT(*) FROM `Usuario`;
