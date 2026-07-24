class HomeController {
    index(req, res) {
        return res.status(200).json({
            mensagem: "Bem-vindo à API do Sistema de Gerenciamento de Tarefas!"
        });
    }
}

module.exports = new HomeController();