import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("Pendente");

  const [tarefaEditando, setTarefaEditando] = useState(null);

  useEffect(() => {
    buscarTarefas();
  }, []);

  // Buscar todas as tarefas
  async function buscarTarefas() {
    try {
      const resposta = await fetch("http://localhost:3000/tasks");
      const dados = await resposta.json();

      setTarefas(dados);
    } catch (erro) {
      console.error("Erro ao buscar tarefas:", erro);
    }
  }

  // Criar nova tarefa
  async function criarTarefa(e) {
    e.preventDefault();

    try {
      const resposta = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          descricao,
          status,
        }),
      });

      const dados = await resposta.json();

      console.log(dados);

      limparFormulario();
      buscarTarefas();
    } catch (erro) {
      console.error("Erro ao criar tarefa:", erro);
    }
  }

  // Iniciar edição
  function iniciarEdicao(tarefa) {
    setTitulo(tarefa.titulo);
    setDescricao(tarefa.descricao);
    setStatus(tarefa.status);

    setTarefaEditando(tarefa.id);
    setMostrarFormulario(true);
  }

  // Editar tarefa
  async function editarTarefa(e) {
    e.preventDefault();

    try {
      const resposta = await fetch(
        `http://localhost:3000/tasks/${tarefaEditando}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titulo,
            descricao,
            status,
          }),
        }
      );

      const dados = await resposta.json();

      console.log(dados);

      limparFormulario();
      buscarTarefas();
    } catch (erro) {
      console.error("Erro ao editar tarefa:", erro);
    }
  }

  // Limpar formulário
  function limparFormulario() {
    setTitulo("");
    setDescricao("");
    setStatus("Pendente");

    setTarefaEditando(null);
    setMostrarFormulario(false);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Gerenciador de Tarefas</h1>

        <button
          className="btn-nova-tarefa"
          onClick={() => {
            limparFormulario();
            setMostrarFormulario(true);
          }}
        >
          + Nova tarefa
        </button>
      </header>

      <main className="conteudo">
        {mostrarFormulario && (
          <form
            className="formulario"
            onSubmit={tarefaEditando ? editarTarefa : criarTarefa}
          >
            <h2>
              {tarefaEditando ? "Editar tarefa" : "Nova tarefa"}
            </h2>

            <input
              type="text"
              placeholder="Título da tarefa"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />

            <textarea
              placeholder="Descrição da tarefa"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pendente">Pendente</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
            </select>

            <div className="botoes-formulario">
              <button className="btn-criar" type="submit">
                {tarefaEditando
                  ? "Salvar alterações"
                  : "Criar tarefa"}
              </button>

              <button
                className="btn-cancelar"
                type="button"
                onClick={limparFormulario}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <h2>Minhas tarefas</h2>

        <div className="lista-tarefas">
          {tarefas.map((tarefa) => (
            <div className="tarefa" key={tarefa.id}>
              <div>
                <h3>{tarefa.titulo}</h3>

                <p>{tarefa.descricao}</p>
              </div>

              <span className="status">
                {tarefa.status}
              </span>

              <div className="acoes">
                <button
                  type="button"
                  onClick={() => iniciarEdicao(tarefa)}
                >
                  Editar
                </button>

                <button type="button">
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;