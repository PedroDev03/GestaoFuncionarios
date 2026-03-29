CREATE TABLE usuario (
    id         BIGSERIAL    PRIMARY KEY,
    nome       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL UNIQUE,
    senha      VARCHAR(255) NOT NULL,
    created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE funcionario (
    id            BIGSERIAL      PRIMARY KEY,
    nome          VARCHAR(255)   NOT NULL,
    data_admissao DATE           NOT NULL,
    salario       DECIMAL(10, 2) NOT NULL,
    status        VARCHAR(20)    NOT NULL DEFAULT 'ATIVO',
    created_at    TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);
