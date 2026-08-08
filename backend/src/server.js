// Carrega variáveis do arquivo .env
require("dotenv").config();

// Importa a aplicação Express
const app = require("./app");
const initDatabase = require("./database/initDatabase");

// Inicializa o banco de dados

// Define a porta
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado na porta ${PORT}`);
});