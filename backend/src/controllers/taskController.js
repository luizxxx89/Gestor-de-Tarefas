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
// Buscar uma tarefa pelo ID
const buscarTarefaPorId = (req, res) => {
    const id = req.params.id;

    taskService.buscarTarefaPorId(id, (err, tarefa) => {
        if (err) {
            return res.status(500).json({
                mensagem: "Erro ao buscar tarefa.",
                erro: err.message
            });
        }

        if (!tarefa) {
            return res.status(404).json({
                mensagem: "Tarefa não encontrada."
            });
        }

        res.status(200).json(tarefa);
    });
};
module.exports = {
    criarTarefa,
    buscarTodasTarefas,
    buscarTarefaPorId
};