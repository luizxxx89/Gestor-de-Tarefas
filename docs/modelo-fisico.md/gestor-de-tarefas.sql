-- ============================================
-- BANCO DE DADOS: GESTOR DE TAREFAS
-- Modelo Físico
-- ============================================

CREATE DATABASE gestor_tarefas;

USE gestor_tarefas;

-- ============================================
-- TABELA USUARIO
-- ============================================

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_cadastro DATE NOT NULL
);

-- ============================================
-- TABELA PROJETO
-- ============================================

CREATE TABLE projeto (
    id_projeto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_criacao DATE,
    id_usuario INT NOT NULL,

    CONSTRAINT fk_projeto_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================================
-- TABELA TAREFA
-- ============================================

CREATE TABLE tarefa (
    id_tarefa INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    prioridade VARCHAR(20),
    status VARCHAR(20),
    data_inicio DATE,
    data_vencimento DATE,
    id_projeto INT NOT NULL,

    CONSTRAINT fk_tarefa_projeto
        FOREIGN KEY (id_projeto)
        REFERENCES projeto(id_projeto)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================================
-- TABELA CATEGORIA
-- ============================================

CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

-- ============================================
-- TABELA TAREFA_CATEGORIA
-- ============================================

CREATE TABLE tarefa_categoria (

    id_tarefa INT NOT NULL,
    id_categoria INT NOT NULL,

    PRIMARY KEY (id_tarefa, id_categoria),

    CONSTRAINT fk_tc_tarefa
        FOREIGN KEY (id_tarefa)
        REFERENCES tarefa(id_tarefa)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_tc_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES categoria(id_categoria)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);