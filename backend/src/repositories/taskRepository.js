// Importa a conexão com o banco de dados
const db = require("../config/database");

// Insere uma nova tarefa
const criarTarefa = (tarefa, callback) => {
    const sql = `
        INSERT INTO tasks (titulo, descricao, status)
        VALUES (?, ?, ?)
    `;

    db.run(
        sql,
        [
            tarefa.titulo,
            tarefa.descricao,
            tarefa.status || "Pendente"
        ],
        function (err) {
            callback(err, this.lastID);
        }
    );
};

// Busca todas as tarefas
const buscarTodasTarefas = (callback) => {
    const sql = `
        SELECT *
        FROM tasks
        ORDER BY id DESC
    `;

    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
};

// Busca uma tarefa pelo ID
const buscarTarefaPorId = (id, callback) => {
    const sql = `
        SELECT *
        FROM tasks
        WHERE id = ?
    `;

    db.get(sql, [id], (err, row) => {
        callback(err, row);
    });
};
// Atualiza uma tarefa pelo ID
const atualizarTarefa = (id, tarefa, callback) => {
    const sql = `
        UPDATE tasks
        SET titulo = ?, descricao = ?, status = ?, dataAtualizacao = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    db.run(
        sql,
        [
            tarefa.titulo,
            tarefa.descricao,
            tarefa.status,
            id
        ],
        function (err) {
            callback(err, this.changes);
        }
    );
};
// Exclui uma tarefa pelo ID
const excluirTarefa = (id, callback) => {
    const sql = `
        DELETE FROM tasks
        WHERE id = ?
    `;

    db.run(sql, [id], function (err) {
        callback(err, this.changes);
    });
};

// Exporta todas as funções do repository
module.exports = {
    criarTarefa,
    buscarTodasTarefas,
    buscarTarefaPorId,
    atualizarTarefa,
    excluirTarefa
};