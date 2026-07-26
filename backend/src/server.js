// Carrega variáveis do arquivo .env
require("dotenv").config();

// Importa a aplicação Express
const app = require("./app");


// Define a porta
const PORT = process.env.PORT || 3000;


// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado na porta ${PORT}`);
});