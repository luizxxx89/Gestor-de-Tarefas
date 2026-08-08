const taskService = require("../service/taskService");

// Criar uma nova tarefa
const criarTarefa = (req, res) => {
    const tarefa = req.body;

    taskService.criarTarefa(tarefa, (err, tarefaCriada) => {
        if (err) {
            return res.status(500).json({
                mensagem: "Erro ao criar tarefa.",
                erro: err.message
            });
        }

        res.status(201).json({
            mensagem: "Tarefa criada com sucesso!",
            tarefa: tarefaCriada
        });
    });
};

// Buscar todas as tarefas
const buscarTodasTarefas = (req, res) => {
    taskService.buscarTodasTarefas((err, tarefas) => {
        if (err) {
            return res.status(500).json({
                mensagem: "Erro ao buscar tarefas.",
                erro: err.message
            });
        }

        res.status(200).json(tarefas);
    });
};

module.exports = {
    criarTarefa,
    buscarTodasTarefas
};