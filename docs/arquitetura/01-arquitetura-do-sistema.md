# Arquitetura do Sistema

## Projeto

**Gestor de Tarefas**

---

# 1. Objetivo

Este documento descreve a arquitetura do sistema **Gestor de Tarefas**, apresentando sua estrutura, componentes, responsabilidades e o fluxo de comunicação entre as camadas da aplicação.

A arquitetura foi projetada para proporcionar organização, facilidade de manutenção, escalabilidade e reutilização de código.

---

# 2. Arquitetura Escolhida

O sistema utilizará uma **Arquitetura em Camadas (Layered Architecture)**.

Cada camada possui uma responsabilidade específica, tornando a aplicação organizada e desacoplada.

As camadas são:

- Apresentação (Front-end)
- Aplicação (Back-end)
- Persistência (Banco de Dados)

---

# 3. Visão Geral da Arquitetura

```
                Usuário
                    │
                    ▼
             Front-end (React)
                    │
             Requisições HTTP
                    │
                    ▼
        API REST (Spring Boot)
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
 Controllers   Services   Repositories
        │
        ▼
      MySQL
```

---

# 4. Componentes da Arquitetura

## Front-end

Responsável pela interface gráfica do sistema.

### Responsabilidades

- Exibir informações
- Receber dados do usuário
- Realizar validações básicas
- Consumir a API REST
- Atualizar a interface

### Tecnologia

- React
- HTML
- CSS
- JavaScript

---

## Back-end

Responsável pelas regras de negócio da aplicação.

### Responsabilidades

- Receber requisições HTTP
- Processar regras de negócio
- Validar informações
- Autenticar usuários
- Gerenciar tarefas
- Gerenciar projetos
- Comunicar-se com o banco de dados

### Camadas

### Controllers

Recebem as requisições HTTP.

### Services

Executam as regras de negócio.

### Repositories

Realizam acesso ao banco de dados.

### Tecnologia

- Java
- Spring Boot
- Spring Data JPA

---

## Banco de Dados

Responsável pelo armazenamento permanente das informações.

### Responsabilidades

- Armazenar usuários
- Armazenar projetos
- Armazenar tarefas
- Armazenar categorias
- Garantir integridade dos dados

### Tecnologia

- MySQL

---

# 5. Fluxo de Funcionamento

1. O usuário acessa o sistema.

2. O Front-end envia uma requisição HTTP para a API.

3. O Controller recebe a requisição.

4. O Controller chama o Service.

5. O Service executa as regras de negócio.

6. O Service solicita informações ao Repository.

7. O Repository acessa o banco de dados.

8. O banco retorna os dados.

9. O Service processa o resultado.

10. O Controller devolve a resposta.

11. O Front-end apresenta os dados ao usuário.

---

# 6. Tecnologias Utilizadas

| Camada | Tecnologia |
|---------|------------|
| Front-end | React |
| Back-end | Java |
| Framework | Spring Boot |
| Banco de Dados | MySQL |
| Controle de Versão | Git |
| Repositório | GitHub |
| API | REST |
| Persistência | JPA / Hibernate |

---

# 7. Estrutura do Projeto

```
Gestor-de-Tarefas/

│

├── backend/

│   ├── controller/

│   ├── service/

│   ├── repository/

│   ├── model/

│   └── config/

│

├── frontend/

│   ├── src/

│   ├── components/

│   ├── pages/

│   └── services/

│

├── docs/

│   ├── requisitos/

│   ├── casos-de-uso/

│   ├── diagrama-de-classes/

│   ├── der/

│   ├── modelo-logico/

│   ├── modelo-fisico/

│   ├── arquitetura/

│   └── prototipos/

│

└── README.md
```

---

# 8. Benefícios da Arquitetura

- Separação de responsabilidades.
- Facilidade de manutenção.
- Maior organização do código.
- Facilidade para testes.
- Escalabilidade.
- Reutilização de componentes.
- Baixo acoplamento.
- Alta coesão.

---

# 9. Escalabilidade

A arquitetura permite futuras implementações, como:

- Sistema de autenticação JWT.
- Controle de permissões.
- Compartilhamento de projetos.
- Notificações.
- API pública.
- Aplicativo mobile.
- Deploy em nuvem.
- Docker.
- Nginx.
- CI/CD com GitHub Actions.

---

# 10. Conclusão

A Arquitetura em Camadas foi escolhida por ser amplamente utilizada em aplicações web modernas. Ela promove organização, manutenção simplificada e escalabilidade, servindo como uma base sólida para o desenvolvimento do sistema Gestor de Tarefas.

Este documento orientará a implementação das próximas etapas do projeto, garantindo que todas as funcionalidades sejam desenvolvidas de forma consistente e alinhadas às boas práticas de Engenharia de Software.