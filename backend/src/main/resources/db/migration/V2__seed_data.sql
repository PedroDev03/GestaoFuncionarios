-- Seed: funcionário de exemplo
INSERT INTO funcionario (nome, data_admissao, salario, status)
VALUES ('Carlos Eduardo', '2023-01-10', 5000.00, 'ATIVO');

-- Seed: usuário admin
-- Senha: admin123 (BCrypt gerado em tempo de inicialização pelo DataInitializer)
-- O DataInitializer cria este registro via JPA caso ainda não exista,
-- garantindo hash BCrypt correto independente de ambiente.
