# Diagrama de Classes - Gestor de Tarefas

## Descrição

O diagrama de classes representa a estrutura estática do sistema Gestor de Tarefas, evidenciando as principais entidades do domínio, seus atributos, métodos e relacionamentos.

```mermaid
classDiagram

class Usuario {
    +Long id
    +String nome
    +String email
    +String senha
    +LocalDateTime dataCriacao
    +boolean ativo

    +criarProjeto()
    +editarPerfil()
    +listarProjetos()
}

class Projeto {
    +Long id
    +String nome
    +String descricao
    +LocalDateTime dataCriacao
    +LocalDateTime dataAtualizacao

    +criarTarefa()
    +editarProjeto()
    +excluirProjeto()
}

class Tarefa {
    +Long id
    +String titulo
    +String descricao
    +Status status
    +Prioridade prioridade
    +LocalDate dataLimite
    +LocalDateTime dataCriacao
    +LocalDateTime dataAtualizacao

    +alterarStatus()
    +editarTarefa()
    +excluirTarefa()
}

class Status {
    <<enumeration>>
    PENDENTE
    EM_ANDAMENTO
    CONCLUIDA
}

class Prioridade {
    <<enumeration>>
    BAIXA
    MEDIA
    ALTA
}

Usuario "1" --> "0..*" Projeto : cria
Projeto "1" --> "0..*" Tarefa : possui
Tarefa --> Status
Tarefa --> Prioridade
```

---

## Relacionamentos

- Um **Usuário** pode criar vários **Projetos**.
- Um **Projeto** possui várias **Tarefas**.
- Cada **Tarefa** possui um **Status**.
- Cada **Tarefa** possui uma **Prioridade**.

## Classes

### Usuario

Representa o usuário autenticado no sistema.

### Projeto

Agrupa tarefas relacionadas a um objetivo específico.

### Tarefa

Representa uma atividade que deve ser realizada dentro de um projeto.

### Status

Enumeração responsável por controlar o estado da tarefa.

### Prioridade

Enumeração responsável por definir o nível de importância da tarefa.