const express = require("express");
const HomeController = require("../controllers/HomeControllers");
const taskController = require("../controllers/taskController");

const router = express.Router();

// Rota inicial
router.get("/", HomeController.index);

// Criar uma nova tarefa
router.post("/tasks", taskController.criarTarefa);

//buscar uma tarefa pelo ID
router.get("/tasks/:id", taskController.buscarTarefaPorId);

// Buscar todas as tarefas
router.get("/tasks", taskController.buscarTodasTarefas);

module.exports = router;