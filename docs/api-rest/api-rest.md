# API REST - Gestor de Tarefas

## Objetivo

Este documento descreve os endpoints da API REST do sistema **Gestor de Tarefas**.

A API segue o padrão REST, utilizando o formato JSON para envio e recebimento de dados.

---

# Informações Gerais

| Item | Valor |
|------|--------|
| Arquitetura | REST |
| Formato | JSON |
| Protocolo | HTTP/HTTPS |
| Autenticação | JWT |
| URL Base | `/api` |

---

# Autenticação

## Login

### POST `/api/auth/login`

Realiza a autenticação do usuário.

### Request

```json
{
    "email": "usuario@email.com",
    "senha": "123456"
}
```

### Response

```json
{
    "token": "jwt_token",
    "tipo": "Bearer"
}
```

---

# Usuários

## Listar usuários

### GET `/api/usuarios`

### Response

```json
[
    {
        "id": 1,
        "nome": "Luiz Henrique",
        "email": "luiz@email.com"
    }
]
```

---

## Buscar usuário

### GET `/api/usuarios/{id}`

---

## Cadastrar usuário

### POST `/api/usuarios`

### Request

```json
{
    "nome": "Luiz Henrique",
    "email": "luiz@email.com",
    "senha": "123456"
}
```

### Response

```json
{
    "id": 1,
    "nome": "Luiz Henrique",
    "email": "luiz@email.com"
}
```

---

## Atualizar usuário

### PUT `/api/usuarios/{id}`

---

## Excluir usuário

### DELETE `/api/usuarios/{id}`

---

# Projetos

## Listar projetos

### GET `/api/projetos`

---

## Buscar projeto

### GET `/api/projetos/{id}`

---

## Criar projeto

### POST `/api/projetos`

### Request

```json
{
    "nome": "Sistema de Biblioteca",
    "descricao": "Projeto da Faculdade"
}
```

### Response

```json
{
    "id": 1,
    "nome": "Sistema de Biblioteca"
}
```

---

## Atualizar projeto

### PUT `/api/projetos/{id}`

---

## Excluir projeto

### DELETE `/api/projetos/{id}`

---

# Tarefas

## Listar tarefas

### GET `/api/tarefas`

Filtros disponíveis:

```
/api/tarefas?status=PENDENTE

/api/tarefas?prioridade=ALTA

/api/tarefas?projeto=1
```

---

## Buscar tarefa

### GET `/api/tarefas/{id}`

---

## Criar tarefa

### POST `/api/tarefas`

### Request

```json
{
    "titulo": "Criar tela de Login",
    "descricao": "Desenvolver tela inicial",
    "status": "PENDENTE",
    "prioridade": "ALTA",
    "dataLimite": "2026-08-10",
    "projetoId": 1,
    "usuarioResponsavel": 1
}
```

### Response

```json
{
    "id": 10,
    "titulo": "Criar tela de Login"
}
```

---

## Atualizar tarefa

### PUT `/api/tarefas/{id}`

---

## Alterar status

### PATCH `/api/tarefas/{id}/status`

### Request

```json
{
    "status":"CONCLUIDA"
}
```

---

## Excluir tarefa

### DELETE `/api/tarefas/{id}`

---

# Dashboard

## Estatísticas

### GET `/api/dashboard`

### Response

```json
{
    "totalProjetos": 5,
    "totalTarefas": 30,
    "pendentes": 8,
    "emAndamento": 12,
    "concluidas": 10
}
```

---

# Códigos HTTP

| Código | Significado |
|---------|-------------|
| 200 | Requisição realizada com sucesso. |
| 201 | Recurso criado com sucesso. |
| 204 | Recurso excluído com sucesso. |
| 400 | Requisição inválida. |
| 401 | Usuário não autenticado. |
| 403 | Acesso negado. |
| 404 | Recurso não encontrado. |
| 500 | Erro interno do servidor. |

---

# Segurança

A API utiliza autenticação baseada em **JWT (JSON Web Token)**.

Após realizar o login, o token deve ser enviado em todas as requisições protegidas.

Exemplo:

```
Authorization: Bearer <token>
```

---

# Fluxo Geral da API

```text
Cliente (React)

        │

        ▼

API REST (Spring Boot)

        │

        ▼

Camada Service

        │

        ▼

Repository (JPA)

        │

        ▼

Banco de Dados (MySQL)
```

---

# Tecnologias

- Spring Boot
- Spring MVC
- Spring Data JPA
- Spring Security
- JWT
- MySQL
- Maven
- JSON
- REST API