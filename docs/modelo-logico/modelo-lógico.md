USUARIO(
    id PK,
    nome,
    email,
    senha,
    data_criacao
)

PROJETO(
    id PK,
    nome,
    descricao,
    data_inicio,
    data_fim,
    usuario_id FK
)

TAREFA(
    id PK,
    titulo,
    descricao,
    prioridade,
    status,
    prazo,
    data_criacao,
    projeto_id FK,
    usuario_id FK
)

COMENTARIO(
    id PK,
    conteudo,
    data_comentario,
    tarefa_id FK,
    usuario_id FK
)