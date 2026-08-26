// ============================================================
// IMPORTAÇÕES
// ============================================================

// Importa os recursos necessários do React
import { useEffect, useState } from "react";

// Importa o arquivo de estilos
import "./App.css";


// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

function App() {

  // ============================================================
  // ESTADOS
  // ============================================================

  // Armazena a lista de tarefas
  const [tarefas, setTarefas] = useState([]);

  // Controla se o formulário está visível
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Armazena o título digitado no formulário
  const [titulo, setTitulo] = useState("");

  // Armazena a descrição digitada no formulário
  const [descricao, setDescricao] = useState("");

  // Armazena o status selecionado
  const [status, setStatus] = useState("Pendente");

  // Armazena o ID da tarefa que está sendo editada
  // Quando for null, significa que estamos criando uma tarefa
  const [tarefaEditando, setTarefaEditando] = useState(null);

  // Armazena o filtro de status selecionado
  const [filtroStatus, setFiltroStatus] = useState("Todos");

  // Armazena o texto digitado na pesquisa
  const [pesquisa, setPesquisa] = useState("");


  // ============================================================
  // CARREGAR TAREFAS AO ABRIR A PÁGINA
  // ============================================================

  useEffect(() => {

    buscarTarefas();

  }, []);


  // ============================================================
  // BUSCAR TODAS AS TAREFAS
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
  // CRIAR NOVA TAREFA
  // ============================================================

  async function criarTarefa(e) {

    // Impede o formulário de recarregar a página
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

      // Limpa o formulário
      limparFormulario();

      // Atualiza a lista de tarefas
      buscarTarefas();

    } catch (erro) {

      console.error(
        "Erro ao criar tarefa:",
        erro
      );

    }

  }


  // ============================================================
  // INICIAR EDIÇÃO DE UMA TAREFA
  // ============================================================

  function iniciarEdicao(tarefa) {

    // Coloca o título da tarefa no formulário
    setTitulo(tarefa.titulo);

    // Coloca a descrição da tarefa no formulário
    setDescricao(tarefa.descricao);

    // Coloca o status da tarefa no formulário
    setStatus(tarefa.status);

    // Guarda o ID da tarefa que será editada
    setTarefaEditando(tarefa.id);

    // Abre o formulário
    setMostrarFormulario(true);

  }


  // ============================================================
  // EDITAR TAREFA
  // ============================================================

  async function editarTarefa(e) {

    // Impede o formulário de recarregar a página
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

      // Limpa o formulário
      limparFormulario();

      // Atualiza a lista
      buscarTarefas();

    } catch (erro) {

      console.error(
        "Erro ao editar tarefa:",
        erro
      );

    }

  }


  // ============================================================
  // ALTERAR STATUS RAPIDAMENTE
  // ============================================================

  async function alterarStatus(id, novoStatus) {

    try {

      // Procura a tarefa que está sendo alterada
      const tarefa = tarefas.find(
        (item) => item.id === id
      );

      // Se a tarefa não for encontrada, interrompe
      if (!tarefa) {

        console.error(
          "Tarefa não encontrada."
        );

        return;

      }

      // Envia a atualização para o backend
      //
      // Enviamos também título e descrição porque
      // nosso endpoint PUT trabalha com os dados da tarefa.
      const resposta = await fetch(
        `http://localhost:3000/tasks/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            titulo: tarefa.titulo,

            descricao: tarefa.descricao,

            status: novoStatus,

          }),
        }
      );

      const dados = await resposta.json();

      console.log(dados);

      // Busca novamente as tarefas
      // para atualizar a tela com o novo status
      buscarTarefas();

    } catch (erro) {

      console.error(
        "Erro ao alterar status:",
        erro
      );

    }

  }


  // ============================================================
  // EXCLUIR TAREFA
  // ============================================================

  async function excluirTarefa(id) {

    // Pergunta ao usuário se realmente deseja excluir
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?"
    );

    // Se o usuário clicar em Cancelar,
    // não fazemos nada
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

      // Atualiza a lista depois da exclusão
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

    // Limpa o título
    setTitulo("");

    // Limpa a descrição
    setDescricao("");

    // Volta o status para Pendente
    setStatus("Pendente");

    // Sai do modo de edição
    setTarefaEditando(null);

    // Fecha o formulário
    setMostrarFormulario(false);

  }


  // ============================================================
  // FILTRO POR STATUS
  // ============================================================

  const tarefasPorStatus =
    filtroStatus === "Todos"

      ? tarefas

      : tarefas.filter(
          (tarefa) =>
            tarefa.status === filtroStatus
        );


  // ============================================================
  // PESQUISA PELO TÍTULO
  // ============================================================

  const tarefasFiltradas =
    tarefasPorStatus.filter(
      (tarefa) =>
        tarefa.titulo
          .toLowerCase()
          .includes(
            pesquisa.toLowerCase()
          )
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

            // Limpa o formulário
            limparFormulario();

            // Abre o formulário
            setMostrarFormulario(true);

          }}
        >

          + Nova tarefa

        </button>

      </header>


      {/* ======================================================
          CONTEÚDO PRINCIPAL
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


            {/* ==================================================
                TÍTULO
                ================================================== */}

            <input
              type="text"

              placeholder="Título da tarefa"

              value={titulo}

              onChange={(e) =>
                setTitulo(e.target.value)
              }

              required
            />


            {/* ==================================================
                DESCRIÇÃO
                ================================================== */}

            <textarea
              placeholder="Descrição da tarefa"

              value={descricao}

              onChange={(e) =>
                setDescricao(e.target.value)
              }

              required
            />


            {/* ==================================================
                STATUS
                ================================================== */}

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


            {/* ==================================================
                BOTÕES DO FORMULÁRIO
                ================================================== */}

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


          {/* Total */}

          <div className="card-resumo">

            <span>
              Total
            </span>

            <strong>
              {tarefas.length}
            </strong>

          </div>


          {/* Pendentes */}

          <div className="card-resumo">

            <span>
              Pendentes
            </span>

            <strong>

              {
                tarefas.filter(
                  (tarefa) =>
                    tarefa.status === "Pendente"
                ).length
              }

            </strong>

          </div>


          {/* Em andamento */}

          <div className="card-resumo">

            <span>
              Em andamento
            </span>

            <strong>

              {
                tarefas.filter(
                  (tarefa) =>
                    tarefa.status === "Em andamento"
                ).length
              }

            </strong>

          </div>


          {/* Concluídas */}

          <div className="card-resumo">

            <span>
              Concluídas
            </span>

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


          {/* Todas */}

          <button
            type="button"

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


          {/* Pendentes */}

          <button
            type="button"

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


          {/* Em andamento */}

          <button
            type="button"

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


          {/* Concluídas */}

          <button
            type="button"

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
            TÍTULO DA LISTA
            ==================================================== */}

        <h2>
          Minhas tarefas
        </h2>


        {/* ====================================================
            LISTA DE TAREFAS
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


                {/* ============================================
                    INFORMAÇÕES DA TAREFA
                    ============================================ */}

                <div>

                  <h3>
                    {tarefa.titulo}
                  </h3>

                  <p>
                    {tarefa.descricao}
                  </p>

                </div>


                {/* ============================================
                    STATUS
                    ============================================ */}

                <select
                  className={`status ${
                    tarefa.status === "Pendente"
                      ? "status-pendente"

                      : tarefa.status === "Em andamento"
                      ? "status-andamento"

                      : "status-concluida"
                  }`}

                  value={tarefa.status}

                  onChange={(e) =>
                    alterarStatus(
                      tarefa.id,
                      e.target.value
                    )
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


                {/* ============================================
                    BOTÕES DE AÇÃO
                    ============================================ */}

                <div className="acoes">


                  {/* Editar */}

                  <button
                    type="button"

                    onClick={() =>
                      iniciarEdicao(tarefa)
                    }
                  >

                    Editar

                  </button>


                  {/* Excluir */}

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


// ============================================================
// EXPORTAÇÃO
// ============================================================

export default App;
