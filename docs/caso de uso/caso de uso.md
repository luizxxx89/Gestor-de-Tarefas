# Casos de Uso

## Projeto: Sistema de Gerenciamento de Tarefas

### UC01 - Criar Tarefa

**Objetivo**
Permitir que o usuário cadastre uma nova tarefa.

**Ator Principal**
Usuário

**Pré-condições**
- O sistema deve estar em execução.

**Fluxo Principal**
1. O usuário acessa o sistema.
2. O usuário seleciona a opção "Nova Tarefa".
3. O usuário informa o título da tarefa.
4. O usuário informa uma descrição (opcional).
5. O usuário define uma data de vencimento (opcional).
6. O usuário confirma o cadastro.
7. O sistema salva a tarefa.
8. O sistema exibe a tarefa na lista.

**Fluxo Alternativo**
- Caso o título esteja vazio, o sistema informa que o campo é obrigatório.

**Pós-condições**
- A tarefa é armazenada e aparece na lista.

---

### UC02 - Editar Tarefa

**Objetivo**
Permitir alterar uma tarefa existente.

**Ator Principal**
Usuário

**Pré-condições**
- Deve existir pelo menos uma tarefa cadastrada.

**Fluxo Principal**
1. O usuário seleciona uma tarefa.
2. O usuário clica em "Editar".
3. O sistema exibe os dados atuais.
4. O usuário altera as informações.
5. O usuário salva as alterações.
6. O sistema atualiza a tarefa.

**Fluxo Alternativo**
- O usuário cancela a edição.

**Pós-condições**
- A tarefa permanece atualizada.

---

### UC03 - Excluir Tarefa

**Objetivo**
Permitir remover uma tarefa.

**Ator Principal**
Usuário

**Pré-condições**
- Deve existir uma tarefa cadastrada.

**Fluxo Principal**
1. O usuário seleciona uma tarefa.
2. O usuário clica em "Excluir".
3. O sistema solicita confirmação.
4. O usuário confirma.
5. O sistema remove a tarefa.

**Fluxo Alternativo**
- O usuário cancela a exclusão.

**Pós-condições**
- A tarefa deixa de existir.

---

### UC04 - Concluir Tarefa

**Objetivo**
Permitir marcar uma tarefa como concluída.

**Ator Principal**
Usuário

**Pré-condições**
- Deve existir uma tarefa.

**Fluxo Principal**
1. O usuário seleciona uma tarefa.
2. O usuário marca a opção "Concluída".
3. O sistema altera o status da tarefa.

**Fluxo Alternativo**
- O usuário desmarca a tarefa, retornando o status para "Pendente".

**Pós-condições**
- O status da tarefa é atualizado.

---

### UC05 - Visualizar Lista de Tarefas

**Objetivo**
Permitir consultar todas as tarefas cadastradas.

**Ator Principal**
Usuário

**Pré-condições**
- O sistema deve estar aberto.

**Fluxo Principal**
1. O usuário acessa a tela principal.
2. O sistema apresenta todas as tarefas cadastradas.

**Pós-condições**
- A lista permanece disponível para consulta.