const taskRepository = require("../repositories/taskRepository");

// Criar uma nova tarefa
const criarTarefa = (tarefa, callback) => {
    taskRepository.criarTarefa(tarefa, callback);
};

// Buscar todas as tarefas
const buscarTodasTarefas = (callback) => {
    taskRepository.buscarTodasTarefas(callback);
};

module.exports = {
    criarTarefa,
    buscarTodasTarefas
};