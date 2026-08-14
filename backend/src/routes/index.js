const express = require("express");
const HomeController = require("../controllers/HomeController");
const taskController = require("../controllers/taskControllers");

const router = express.Router();

// Rota inicial
router.get("/", HomeController.index);

// Criar uma nova tarefa
router.post("/tasks", taskController.criarTarefa);

// Buscar todas as tarefas
router.get("/tasks", taskController.buscarTodasTarefas);

module.exports = router;