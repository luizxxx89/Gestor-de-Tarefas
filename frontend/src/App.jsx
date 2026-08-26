// Importa os recursos do React
import { useEffect, useState } from "react";

// Importa os estilos
import "./App.css";

function App() {
  // ============================================================
  // ESTADOS
  // ============================================================

  // Lista de tarefas vindas do backend
  const [tarefas, setTarefas] = useState([]);

  // Controla a exibição do formulário
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Dados do formulário
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("Pendente");

  // ID da tarefa que está sendo editada
  const [tarefaEditando, setTarefaEditando] = useState(null);

  // Status utilizado no filtro
  const [filtroStatus, setFiltroStatus] = useState("Todos");

  // Texto utilizado na pesquisa
  const [pesquisa, setPesquisa] = useState("");


  // ============================================================
  // CARREGAR TAREFAS
  // ============================================================

  useEffect(() => {
    buscarTarefas();
  }, []);


  // ============================================================
  // BUSCAR TAREFAS
  // ============================================================

  async function buscarTarefas() {
    try {
      const resposta = await fetch(
        "http://localhost:3000/tasks"
      );

      const dados = await resposta.json();

      setTarefas(dados);

    } catch (erro) {
      console.error(
        "Erro ao buscar tarefas:",
        erro
      );
    }
  }


  // ============================================================
  // CRIAR TAREFA
  // ============================================================

  async function criarTarefa(e) {
    e.preventDefault();

    try {
      const resposta = await fetch(
        "http://localhost:3000/tasks",
        {
          method: "POST",

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
      console.error(
        "Erro ao criar tarefa:",
        erro
      );
    }
  }


  // ============================================================
  // INICIAR EDIÇÃO
  // ============================================================

  function iniciarEdicao(tarefa) {
    setTitulo(tarefa.titulo);

    setDescricao(tarefa.descricao);

    setStatus(tarefa.status);

    setTarefaEditando(tarefa.id);

    setMostrarFormulario(true);
  }


  // ============================================================
  // EDITAR TAREFA
  // ============================================================

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
      console.error(
        "Erro ao editar tarefa:",
        erro
      );
    }
  }


  // ============================================================
  // EXCLUIR TAREFA
  // ============================================================

  async function excluirTarefa(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:3000/tasks/${id}`,
        {
          method: "DELETE",
        }
      );

      const dados = await resposta.json();

      console.log(dados);

      buscarTarefas();

    } catch (erro) {
      console.error(
        "Erro ao excluir tarefa:",
        erro
      );
    }
  }


  // ============================================================
  // LIMPAR FORMULÁRIO
  // ============================================================

  function limparFormulario() {
    setTitulo("");

    setDescricao("");

    setStatus("Pendente");

    setTarefaEditando(null);

    setMostrarFormulario(false);
  }


  // ============================================================
  // FILTRAR TAREFAS
  // ============================================================

  /*
    Primeiro filtramos pelo status.
  */

  const tarefasPorStatus =
    filtroStatus === "Todos"
      ? tarefas
      : tarefas.filter(
          (tarefa) =>
            tarefa.status === filtroStatus
        );


  /*
    Depois filtramos pelo título.

    O toLowerCase() transforma tudo em letras minúsculas.

    Assim:

    "React"

    e

    "react"

    serão tratados da mesma maneira.
  */

  const tarefasFiltradas =
    tarefasPorStatus.filter((tarefa) =>
      tarefa.titulo
        .toLowerCase()
        .includes(pesquisa.toLowerCase())
    );


  // ============================================================
  // INTERFACE
  // ============================================================

  return (
    <div className="app">

      {/* ======================================================
          CABEÇALHO
          ====================================================== */}

      <header className="header">

        <h1>
          Gerenciador de Tarefas
        </h1>

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


      {/* ======================================================
          CONTEÚDO
          ====================================================== */}

      <main className="conteudo">


        {/* ====================================================
            FORMULÁRIO
            ==================================================== */}

        {mostrarFormulario && (

          <form
            className="formulario"

            onSubmit={
              tarefaEditando
                ? editarTarefa
                : criarTarefa
            }
          >

            <h2>
              {tarefaEditando
                ? "Editar tarefa"
                : "Nova tarefa"}
            </h2>


            {/* Campo título */}

            <input
              type="text"
              placeholder="Título da tarefa"
              value={titulo}
              onChange={(e) =>
                setTitulo(e.target.value)
              }
              required
            />


            {/* Campo descrição */}

            <textarea
              placeholder="Descrição da tarefa"
              value={descricao}
              onChange={(e) =>
                setDescricao(e.target.value)
              }
              required
            />


            {/* Campo status */}

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >

              <option value="Pendente">
                Pendente
              </option>

              <option value="Em andamento">
                Em andamento
              </option>

              <option value="Concluída">
                Concluída
              </option>

            </select>


            {/* Botões */}

            <div className="botoes-formulario">

              <button
                className="btn-criar"
                type="submit"
              >
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


        {/* ====================================================
            PAINEL DE RESUMO
            ==================================================== */}

        <div className="resumo">

          <div className="card-resumo">
            <span>Total</span>

            <strong>
              {tarefas.length}
            </strong>
          </div>


          <div className="card-resumo">
            <span>Pendentes</span>

            <strong>
              {
                tarefas.filter(
                  (tarefa) =>
                    tarefa.status === "Pendente"
                ).length
              }
            </strong>
          </div>


          <div className="card-resumo">
            <span>Em andamento</span>

            <strong>
              {
                tarefas.filter(
                  (tarefa) =>
                    tarefa.status === "Em andamento"
                ).length
              }
            </strong>
          </div>


          <div className="card-resumo">
            <span>Concluídas</span>

            <strong>
              {
                tarefas.filter(
                  (tarefa) =>
                    tarefa.status === "Concluída"
                ).length
              }
            </strong>
          </div>

        </div>


        {/* ====================================================
            PESQUISA
            ==================================================== */}

        <div className="pesquisa">

          <input
            type="text"
            placeholder="🔎 Pesquisar tarefa pelo título..."
            value={pesquisa}
            onChange={(e) =>
              setPesquisa(e.target.value)
            }
          />

        </div>


        {/* ====================================================
            FILTROS
            ==================================================== */}

        <div className="filtros">

          <button
            className={
              filtroStatus === "Todos"
                ? "filtro-ativo"
                : ""
            }

            onClick={() =>
              setFiltroStatus("Todos")
            }
          >
            Todas
          </button>


          <button
            className={
              filtroStatus === "Pendente"
                ? "filtro-ativo"
                : ""
            }

            onClick={() =>
              setFiltroStatus("Pendente")
            }
          >
            Pendentes
          </button>


          <button
            className={
              filtroStatus === "Em andamento"
                ? "filtro-ativo"
                : ""
            }

            onClick={() =>
              setFiltroStatus("Em andamento")
            }
          >
            Em andamento
          </button>


          <button
            className={
              filtroStatus === "Concluída"
                ? "filtro-ativo"
                : ""
            }

            onClick={() =>
              setFiltroStatus("Concluída")
            }
          >
            Concluídas
          </button>

        </div>


        {/* ====================================================
            TÍTULO
            ==================================================== */}

        <h2>
          Minhas tarefas
        </h2>


        {/* ====================================================
            LISTA
            ==================================================== */}

        <div className="lista-tarefas">

          {tarefasFiltradas.length === 0 ? (

            <div className="nenhuma-tarefa">
              Nenhuma tarefa encontrada.
            </div>

          ) : (

            tarefasFiltradas.map((tarefa) => (

              <div
                className="tarefa"
                key={tarefa.id}
              >

                {/* Informações */}

                <div>

                  <h3>
                    {tarefa.titulo}
                  </h3>

                  <p>
                    {tarefa.descricao}
                  </p>

                </div>


                {/* Status */}

                <span
                  className={`status ${
                    tarefa.status === "Pendente"
                      ? "status-pendente"
                      : tarefa.status === "Em andamento"
                      ? "status-andamento"
                      : "status-concluida"
                  }`}
                >
                  {tarefa.status}
                </span>


                {/* Ações */}

                <div className="acoes">

                  <button
                    type="button"
                    onClick={() =>
                      iniciarEdicao(tarefa)
                    }
                  >
                    Editar
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      excluirTarefa(tarefa.id)
                    }
                  >
                    Excluir
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </main>

    </div>
  );
}


// Exporta o componente
export default App;
