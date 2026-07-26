// Importa o Express
const express = require("express");

// Importa o CORS para permitir comunicação com o frontend
const cors = require("cors");

// Cria a aplicação Express
const app = express();


// ===============================
// Middlewares
// ===============================

// Permite requisições de outros domínios (Frontend)
app.use(cors());

// Permite receber dados em formato JSON
app.use(express.json());


// ===============================
// Rota inicial de teste
// ===============================

app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "API do Sistema de Gerenciamento de Tarefas funcionando!"
    });
});


// Exporta a aplicação para o server.js
module.exports = app;