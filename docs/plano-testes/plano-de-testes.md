# Plano de Testes - Gestor de Tarefas

## Objetivo

Este documento define o plano de testes do sistema **Gestor de Tarefas**, estabelecendo os cenários que serão utilizados para verificar se os requisitos funcionais do sistema foram implementados corretamente.

---

# Objetivos dos Testes

Os testes têm como finalidade:

- Verificar o funcionamento correto das funcionalidades do sistema.
- Validar as regras de negócio.
- Garantir a integridade dos dados.
- Identificar possíveis falhas antes da disponibilização da aplicação.

---

# Tipos de Testes

| Tipo | Objetivo |
|------|----------|
| Teste Unitário | Validar métodos individuais das classes. |
| Teste de Integração | Verificar a comunicação entre Controller, Service, Repository e Banco de Dados. |
| Teste Funcional | Validar as funcionalidades do sistema conforme os requisitos. |
| Teste de API | Verificar os endpoints REST utilizando Postman ou Insomnia. |
| Teste de Interface | Validar o funcionamento da aplicação Web. |

---

# Casos de Teste

## CT001 - Cadastrar Usuário

**Objetivo**

Verificar se um usuário pode ser cadastrado corretamente.

### Pré-condição

Nenhuma.

### Passos

1. Informar nome.
2. Informar e-mail válido.
3. Informar senha.
4. Clicar em cadastrar.

### Resultado Esperado

O usuário deve ser cadastrado com sucesso e armazenado no banco de dados.

---

## CT002 - Login

**Objetivo**

Validar a autenticação do usuário.

### Pré-condição

Usuário previamente cadastrado.

### Passos

1. Informar e-mail.
2. Informar senha.
3. Clicar em Entrar.

### Resultado Esperado

O sistema deve retornar um Token JWT válido.

---

## CT003 - Criar Projeto

### Objetivo

Verificar a criação de um projeto.

### Pré-condição

Usuário autenticado.

### Passos

1. Informar nome.
2. Informar descrição.
3. Salvar.

### Resultado Esperado

Projeto criado com sucesso.

---

## CT004 - Editar Projeto

### Resultado Esperado

As alterações devem ser salvas corretamente.

---

## CT005 - Excluir Projeto

### Resultado Esperado

O projeto deve ser removido do sistema.

---

## CT006 - Criar Tarefa

### Objetivo

Cadastrar uma nova tarefa.

### Pré-condição

Projeto existente.

### Resultado Esperado

A tarefa deve ser cadastrada corretamente.

---

## CT007 - Editar Tarefa

### Resultado Esperado

As alterações devem ser gravadas.

---

## CT008 - Alterar Status

### Resultado Esperado

O status da tarefa deve ser atualizado.

---

## CT009 - Excluir Tarefa

### Resultado Esperado

A tarefa deve ser removida.

---

## CT010 - Dashboard

### Objetivo

Verificar os indicadores do sistema.

### Resultado Esperado

O dashboard deve apresentar corretamente:

- Total de projetos
- Total de tarefas
- Tarefas pendentes
- Tarefas em andamento
- Tarefas concluídas

---

# Critérios de Aprovação

O sistema será considerado aprovado quando:

- Todos os testes forem executados.
- Nenhum erro crítico permanecer aberto.
- Os requisitos funcionais forem atendidos.
- Os endpoints da API responderem corretamente.
- Não houver inconsistências no banco de dados.

---

# Ferramentas Utilizadas

| Ferramenta | Finalidade |
|------------|------------|
| JUnit 5 | Testes unitários |
| Mockito | Simulação de dependências |
| Spring Boot Test | Testes de integração |
| Postman | Testes da API REST |
| MySQL | Banco de dados |
| GitHub | Versionamento |

---

# Evidências dos Testes

Durante a execução dos testes poderão ser anexados:

- Capturas de tela.
- Logs da aplicação.
- Respostas da API.
- Relatórios de testes.
- Evidências de correção de erros.

---

# Responsável pelos Testes

**Nome:** Luiz Henrique Costa Lopes

**Projeto:** Gestor de Tarefas

**Data:** Julho de 2026

---

# Considerações Finais

Este plano de testes servirá como referência para validar todas as funcionalidades do sistema durante o desenvolvimento, garantindo maior qualidade, confiabilidade e estabilidade da aplicação antes da implantação.