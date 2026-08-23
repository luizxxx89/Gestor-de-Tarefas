const taskRepository = require("../repositories/taskRepository");

// Criar uma nova tarefa
const criarTarefa = (tarefa, callback) => {
    taskRepository.criarTarefa(tarefa, callback);
};

// Buscar todas as tarefas
const buscarTodasTarefas = (callback) => {
    taskRepository.buscarTodasTarefas(callback);
};
// Buscar uma tarefa pelo ID
const buscarTarefaPorId = (id, callback) => {
    taskRepository.buscarTarefaPorId(id, callback);
}
// Atualizar uma tarefa
const atualizarTarefa = (id, tarefa, callback) => {
    taskRepository.atualizarTarefa(id, tarefa, callback);
};
// Excluir uma tarefa
const excluirTarefa = (id, callback) => {
    taskRepository.excluirTarefa(id, callback);
};
module.exports = {
    criarTarefa,
    buscarTodasTarefas,
    buscarTarefaPorId,
    atualizarTarefa,
    excluirTarefa
};