// Importa a conexão com o banco de dados
const db = require("../config/database");

//Função responsável por inserir uma nova tarefa no banco
const criarTarefa = (tarefa, callback) => {
   
 const sql = `
   INSERT INTO tasks (titulo, descricao)
    VALUES (?, ?)
`;

};     
