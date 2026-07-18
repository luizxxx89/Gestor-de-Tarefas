# Dicionário de Dados

## Objetivo

O dicionário de dados descreve todas as tabelas e seus respectivos campos, tipos de dados, restrições e finalidade dentro do banco de dados do sistema **Gestor de Tarefas**.

---

# Tabela: usuarios

| Campo | Tipo | Obrigatório | Chave | Descrição |
|--------|------|-------------|--------|-----------|
| id | BIGINT | Sim | PK | Identificador único do usuário. |
| nome | VARCHAR(100) | Sim | | Nome completo do usuário. |
| email | VARCHAR(150) | Sim | UNIQUE | Endereço de e-mail utilizado para autenticação. |
| senha | VARCHAR(255) | Sim | | Senha criptografada do usuário. |
| data_criacao | TIMESTAMP | Sim | | Data e hora do cadastro. |
| ativo | BOOLEAN | Sim | | Indica se o usuário está ativo no sistema. |

---

# Tabela: projetos

| Campo | Tipo | Obrigatório | Chave | Descrição |
|--------|------|-------------|--------|-----------|
| id | BIGINT | Sim | PK | Identificador único do projeto. |
| nome | VARCHAR(100) | Sim | | Nome do projeto. |
| descricao | TEXT | Não | | Descrição detalhada do projeto. |
| data_criacao | TIMESTAMP | Sim | | Data de criação do projeto. |
| data_atualizacao | TIMESTAMP | Não | | Data da última atualização do projeto. |
| id_usuario | BIGINT | Sim | FK | Usuário responsável pelo projeto. |

---

# Tabela: tarefas

| Campo | Tipo | Obrigatório | Chave | Descrição |
|--------|------|-------------|--------|-----------|
| id | BIGINT | Sim | PK | Identificador único da tarefa. |
| titulo | VARCHAR(150) | Sim | | Título da tarefa. |
| descricao | TEXT | Não | | Descrição detalhada da tarefa. |
| status | ENUM | Sim | | Situação atual da tarefa. |
| prioridade | ENUM | Sim | | Grau de prioridade da tarefa. |
| data_limite | DATE | Não | | Data prevista para conclusão. |
| data_criacao | TIMESTAMP | Sim | | Data de criação da tarefa. |
| data_atualizacao | TIMESTAMP | Não | | Data da última alteração. |
| id_projeto | BIGINT | Sim | FK | Projeto ao qual a tarefa pertence. |
| id_usuario_responsavel | BIGINT | Sim | FK | Usuário responsável pela execução da tarefa. |

---

# Valores permitidos

## Campo: status

| Valor | Descrição |
|--------|-----------|
| PENDENTE | A tarefa ainda não foi iniciada. |
| EM_ANDAMENTO | A tarefa está sendo executada. |
| CONCLUIDA | A tarefa foi finalizada. |

---

## Campo: prioridade

| Valor | Descrição |
|--------|-----------|
| BAIXA | Baixa prioridade. |
| MEDIA | Prioridade média. |
| ALTA | Alta prioridade. |

---

# Relacionamentos

| Tabela | Relacionamento |
|---------|----------------|
| usuarios → projetos | Um usuário pode possuir vários projetos (1:N). |
| projetos → tarefas | Um projeto pode possuir várias tarefas (1:N). |
| usuarios → tarefas | Um usuário pode ser responsável por várias tarefas (1:N). |

---

# Convenções utilizadas

- **PK (Primary Key):** Chave primária da tabela.
- **FK (Foreign Key):** Chave estrangeira responsável pelo relacionamento entre tabelas.
- **UNIQUE:** Garante que o valor seja único.
- **NOT NULL:** Campo obrigatório.
- **ENUM:** Campo com valores pré-definidos.

---

# Observações

- As senhas dos usuários serão armazenadas utilizando criptografia.
- Todos os identificadores (`id`) serão gerados automaticamente pelo banco de dados.
- As datas serão registradas considerando o horário do servidor.
- Os relacionamentos garantirão a integridade referencial entre as tabelas.