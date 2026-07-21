// Importa a biblioteca SQLite
const sqlite3 = require("sqlite3").verbose();

// Importa o módulo 'path' do Node.js
const path = require("path");

// Define o caminho do arquivo do banco de dados
const dbPath = path.resolve(__dirname, "../../database.sqlite");

// Cria (ou abre) a conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Erro ao conectar ao banco de dados:", err.message);
    } else {
        console.log("✅ Banco de dados conectado com sucesso!");
    }
});

// Exporta a conexão para ser utilizada em outros arquivos
module.exports = db;