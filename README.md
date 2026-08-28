# Gestor de Tarefas

Sistema web de gerenciamento de tarefas desenvolvido como projeto prático de Engenharia de Software.

O projeto foi desenvolvido com uma arquitetura dividida entre **frontend** e **backend**, utilizando uma API REST para comunicação entre as aplicações.

## Objetivo

Desenvolver um sistema simples e funcional para gerenciamento de tarefas, permitindo ao usuário cadastrar, visualizar, editar, excluir, pesquisar e alterar o status das tarefas.

## Funcionalidades

* Cadastro de tarefas
* Listagem de tarefas
* Edição de tarefas
* Exclusão de tarefas
* Alteração rápida do status
* Pesquisa de tarefas por título
* Filtro por status
* Resumo da quantidade de tarefas
* Persistência dos dados em banco SQLite
* Comunicação entre frontend e backend através de API REST

## Tecnologias

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express
* SQLite

### Ferramentas

* Visual Studio Code
* Git
* GitHub

## Estrutura do Projeto

```text
sistema de gerenciamento de tarefas/
│
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── database/
│       ├── middlewares/
│       ├── models/
│       ├── repositories/
│       ├── routes/
│       ├── service/
│       ├── utils/
│       ├── app.js
│       └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── public/
│
├── docs/
│   ├── api-rest/
│   ├── arquitetura/
│   ├── caso-de-uso/
│   ├── der/
│   ├── diagrama-de-classes/
│   ├── dicionario-de-dados/
│   ├── modelo-fisico/
│   ├── modelo-logico/
│   ├── plano-testes/
│   └── requisitos/
│
├── .gitignore
└── README.md
```

## Documentação

A documentação do projeto está organizada na pasta `docs`, contendo:

* Requisitos funcionais e não funcionais
* Casos de uso
* Diagrama de classes
* DER
* Modelo lógico
* Modelo físico
* Dicionário de dados
* Arquitetura do sistema
* Documentação da API REST
* Plano de testes

## Como executar

### Backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

O backend será executado na porta:

```text
http://localhost:3000
```

### Frontend

Em outro terminal, entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O frontend será disponibilizado pelo Vite, normalmente em:

```text
http://localhost:5173
```

## API

A aplicação frontend se comunica com o backend através da API REST.

Principais operações:

| Método | Endpoint     | Função              |
| ------ | ------------ | ------------------- |
| GET    | `/tasks`     | Lista as tarefas    |
| POST   | `/tasks`     | Cria uma tarefa     |
| PUT    | `/tasks/:id` | Atualiza uma tarefa |
| DELETE | `/tasks/:id` | Exclui uma tarefa   |

## Testes

Os principais fluxos da aplicação foram testados, incluindo:

* Criação de tarefas
* Listagem de tarefas
* Edição de tarefas
* Exclusão de tarefas
* Alteração de status
* Pesquisa por título
* Filtros por status
* Comunicação entre frontend e backend
* Persistência dos dados no SQLite

Os testes finais da versão web foram concluídos com sucesso.

## Status do Projeto

**Versão Web — Concluída**

O sistema possui frontend e backend funcionais, integração através de API REST, persistência em SQLite e documentação técnica do projeto.

## Próximos passos

Como evolução futura, o projeto poderá receber uma versão para dispositivos móveis.

## Autor

Projeto desenvolvido por Luiz Lopes como parte da prática de Engenharia de Software e desenvolvimento web.
