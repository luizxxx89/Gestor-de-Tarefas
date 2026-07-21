// Importa a conexão com o banco de dados
const db = require("../config/database");

// Cria a tabela 'tasks' caso ela não exista
const initDatabase = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT,
            status TEXT NOT NULL DEFAULT 'Pendente',
            dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
            dataAtualizacao DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.run(sql, (err) => {
        if (err) {
            console.error("❌ Erro ao criar a tabela tasks:", err.message);
        } else {
            console.log("✅ Tabela 'tasks' verificada/criada com sucesso!");
        }
    });
};

// Exporta a função para ser utilizada em outros arquivos
module.exports = initDatabase;