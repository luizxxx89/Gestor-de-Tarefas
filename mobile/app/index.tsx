```tsx
/*
============================================================
  GERENCIADOR DE TAREFAS - APLICATIVO MOBILE
  Arquivo: app/index.tsx

  Nesta primeira versão:
  - Criamos a tela principal do aplicativo
  - Criamos campo de pesquisa
  - Criamos filtros por status
  - Exibimos uma lista de tarefas
  - Criamos botão para adicionar tarefa
  - Ainda NÃO estamos conectados ao backend

  A conexão com a API será feita em uma etapa posterior.
============================================================
*/


// ============================================================
// IMPORTAÇÕES
// ============================================================

// Componentes básicos do React Native
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// Hook usado para controlar estados da tela
import { useMemo, useState } from 'react';


// ============================================================
// TIPOS
// ============================================================

// Define os possíveis status de uma tarefa
type TaskStatus = 'Pendente' | 'Em andamento' | 'Concluída';


// Define a estrutura de uma tarefa
type Task = {
  id: number;
  title: string;
  status: TaskStatus;
};


// ============================================================
// DADOS TEMPORÁRIOS
// ============================================================

// Por enquanto estamos utilizando tarefas fictícias.
//
// Posteriormente estes dados serão substituídos pelos dados
// vindos da API REST do nosso backend.

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: 'Estudar Node.js',
    status: 'Pendente',
  },
  {
    id: 2,
    title: 'Finalizar documentação do projeto',
    status: 'Em andamento',
  },
  {
    id: 3,
    title: 'Testar API REST',
    status: 'Concluída',
  },
  {
    id: 4,
    title: 'Criar versão mobile',
    status: 'Em andamento',
  },
];


// ============================================================
// FILTROS
// ============================================================

// Define os filtros disponíveis na tela

const FILTERS = [
  'Todas',
  'Pendente',
  'Em andamento',
  'Concluída',
] as const;


// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

export default function HomeScreen() {

  // ----------------------------------------------------------
  // ESTADO DAS TAREFAS
  // ----------------------------------------------------------

  // Guarda a lista de tarefas atualmente exibida
  const [tasks] = useState<Task[]>(INITIAL_TASKS);


  // ----------------------------------------------------------
  // ESTADO DA PESQUISA
  // ----------------------------------------------------------

  // Guarda o texto digitado pelo usuário no campo de pesquisa
  const [search, setSearch] = useState('');


  // ----------------------------------------------------------
  // ESTADO DO FILTRO
  // ----------------------------------------------------------

  // Guarda o filtro selecionado pelo usuário
  const [selectedFilter, setSelectedFilter] =
    useState<(typeof FILTERS)[number]>('Todas');


  // ==========================================================
  // FILTRAGEM DAS TAREFAS
  // ==========================================================

  // useMemo evita recalcular a lista desnecessariamente.
  //
  // A lista será filtrada por:
  // 1. Texto pesquisado
  // 2. Status selecionado

  const filteredTasks = useMemo(() => {

    return tasks.filter((task) => {

      // Verifica se o título contém o texto pesquisado
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());


      // Verifica se o status corresponde ao filtro selecionado
      const matchesFilter =
        selectedFilter === 'Todas' ||
        task.status === selectedFilter;


      // A tarefa só aparece se atender aos dois critérios
      return matchesSearch && matchesFilter;
    });

  }, [tasks, search, selectedFilter]);


  // ==========================================================
  // CONTADORES
  // ==========================================================

  // Total de tarefas
  const totalTasks = tasks.length;


  // Total de tarefas pendentes
  const pendingTasks = tasks.filter(
    (task) => task.status === 'Pendente'
  ).length;


  // Total de tarefas em andamento
  const inProgressTasks = tasks.filter(
    (task) => task.status === 'Em andamento'
  ).length;


  // Total de tarefas concluídas
  const completedTasks = tasks.filter(
    (task) => task.status === 'Concluída'
  ).length;


  // ==========================================================
  // RENDERIZAÇÃO DE CADA TAREFA
  // ==========================================================

  // Esta função define como cada tarefa será apresentada.

  const renderTask = ({ item }: { item: Task }) => {

    return (
      <View style={styles.taskCard}>

        {/* Informações principais da tarefa */}
        <View style={styles.taskContent}>

          {/* Título da tarefa */}
          <Text style={styles.taskTitle}>
            {item.title}
          </Text>


          {/* Status da tarefa */}
          <View style={styles.statusContainer}>

            <Text style={styles.statusLabel}>
              Status:
            </Text>

            <Text
              style={[
                styles.statusText,
                item.status === 'Concluída' &&
                  styles.statusCompleted,
                item.status === 'Em andamento' &&
                  styles.statusInProgress,
                item.status === 'Pendente' &&
                  styles.statusPending,
              ]}
            >
              {item.status}
            </Text>

          </View>

        </View>


        {/* Botão de edição */}
        <Pressable
          style={styles.editButton}
          onPress={() => {
            console.log('Editar tarefa:', item.id);
          }}
        >
          <Text style={styles.editButtonText}>
            Editar
          </Text>
        </Pressable>

      </View>
    );
  };


  // ==========================================================
  // TELA
  // ==========================================================

  return (

    <SafeAreaView style={styles.container}>

      {/* ====================================================
          CABEÇALHO
          ==================================================== */}

      <View style={styles.header}>

        <View>

          <Text style={styles.appTitle}>
            Gerenciador de Tarefas
          </Text>

          <Text style={styles.headerSubtitle}>
            Organize suas atividades
          </Text>

        </View>


        {/* Botão para adicionar tarefa */}
        <Pressable
          style={styles.addButton}
          onPress={() => {
            console.log('Adicionar nova tarefa');
          }}
        >
          <Text style={styles.addButtonText}>
            +
          </Text>
        </Pressable>

      </View>


      {/* ====================================================
          CARDS DE RESUMO
          ==================================================== */}

      <View style={styles.summaryContainer}>

        {/* Total */}
        <View style={styles.summaryCard}>

          <Text style={styles.summaryNumber}>
            {totalTasks}
          </Text>

          <Text style={styles.summaryLabel}>
            Total
          </Text>

        </View>


        {/* Pendentes */}
        <View style={styles.summaryCard}>

          <Text style={styles.summaryNumber}>
            {pendingTasks}
          </Text>

          <Text style={styles.summaryLabel}>
            Pendentes
          </Text>

        </View>


        {/* Em andamento */}
        <View style={styles.summaryCard}>

          <Text style={styles.summaryNumber}>
            {inProgressTasks}
          </Text>

          <Text style={styles.summaryLabel}>
            Em andamento
          </Text>

        </View>


        {/* Concluídas */}
        <View style={styles.summaryCard}>

          <Text style={styles.summaryNumber}>
            {completedTasks}
          </Text>

          <Text style={styles.summaryLabel}>
            Concluídas
          </Text>

        </View>

      </View>


      {/* ====================================================
          CAMPO DE PESQUISA
          ==================================================== */}

      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar tarefa..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
      />


      {/* ====================================================
          FILTROS
          ==================================================== */}

      <View style={styles.filtersContainer}>

        {FILTERS.map((filter) => {

          // Verifica se o filtro está selecionado
          const isSelected = selectedFilter === filter;

          return (

            <Pressable
              key={filter}
              style={[
                styles.filterButton,
                isSelected && styles.filterButtonSelected,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >

              <Text
                style={[
                  styles.filterText,
                  isSelected && styles.filterTextSelected,
                ]}
              >
                {filter}
              </Text>

            </Pressable>

          );

        })}

      </View>


      {/* ====================================================
          TÍTULO DA LISTA
          ==================================================== */}

      <Text style={styles.listTitle}>
        Minhas tarefas
      </Text>


      {/* ====================================================
          LISTA DE TAREFAS
          ==================================================== */}

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask}

        // Espaço no final da lista
        contentContainerStyle={styles.listContent}

        // Mensagem caso nenhuma tarefa seja encontrada
        ListEmptyComponent={
          <View style={styles.emptyContainer}>

            <Text style={styles.emptyTitle}>
              Nenhuma tarefa encontrada
            </Text>

            <Text style={styles.emptyText}>
              Tente alterar a pesquisa ou o filtro.
            </Text>

          </View>
        }
      />

    </SafeAreaView>
  );
}


// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({

  // ----------------------------------------------------------
  // CONTAINER PRINCIPAL
  // ----------------------------------------------------------

  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },


  // ----------------------------------------------------------
  // CABEÇALHO
  // ----------------------------------------------------------

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },


  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },


  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },


  // ----------------------------------------------------------
  // BOTÃO ADICIONAR
  // ----------------------------------------------------------

  addButton: {
    width: 46,
    height: 46,

    borderRadius: 23,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#222',
  },


  addButtonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',

    marginTop: -2,
  },


  // ----------------------------------------------------------
  // RESUMO
  // ----------------------------------------------------------

  summaryContainer: {
    flexDirection: 'row',

    paddingHorizontal: 15,
    gap: 8,

    marginBottom: 15,
  },


  summaryCard: {
    flex: 1,

    backgroundColor: '#fff',

    borderRadius: 10,

    paddingVertical: 12,
    paddingHorizontal: 4,

    alignItems: 'center',

    elevation: 2,
  },


  summaryNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },


  summaryLabel: {
    marginTop: 4,

    fontSize: 11,
    color: '#666',

    textAlign: 'center',
  },


  // ----------------------------------------------------------
  // PESQUISA
  // ----------------------------------------------------------

  searchInput: {
    height: 48,

    marginHorizontal: 15,
    marginBottom: 12,

    paddingHorizontal: 15,

    borderRadius: 10,

    backgroundColor: '#fff',

    borderWidth: 1,
    borderColor: '#ddd',

    fontSize: 15,
    color: '#222',
  },


  // ----------------------------------------------------------
  // FILTROS
  // ----------------------------------------------------------

  filtersContainer: {
    flexDirection: 'row',

    paddingHorizontal: 15,

    gap: 7,

    marginBottom: 15,
  },


  filterButton: {
    flex: 1,

    paddingVertical: 9,
    paddingHorizontal: 5,

    borderRadius: 8,

    backgroundColor: '#fff',

    borderWidth: 1,
    borderColor: '#ddd',

    alignItems: 'center',
  },


  filterButtonSelected: {
    backgroundColor: '#222',
    borderColor: '#222',
  },


  filterText: {
    fontSize: 11,
    color: '#555',
    textAlign: 'center',
  },


  filterTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },


  // ----------------------------------------------------------
  // TÍTULO DA LISTA
  // ----------------------------------------------------------

  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',

    color: '#222',

    marginHorizontal: 15,
    marginBottom: 10,
  },


  // ----------------------------------------------------------
  // LISTA
  // ----------------------------------------------------------

  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },


  // ----------------------------------------------------------
  // CARD DA TAREFA
  // ----------------------------------------------------------

  taskCard: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#fff',

    borderRadius: 10,

    padding: 15,

    marginBottom: 10,

    elevation: 2,
  },


  taskContent: {
    flex: 1,
    paddingRight: 10,
  },


  taskTitle: {
    fontSize: 16,

    fontWeight: '600',

    color: '#222',

    marginBottom: 8,
  },


  // ----------------------------------------------------------
  // STATUS
  // ----------------------------------------------------------

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  statusLabel: {
    fontSize: 12,
    color: '#777',

    marginRight: 5,
  },


  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },


  statusPending: {
    color: '#d97706',
  },


  statusInProgress: {
    color: '#2563eb',
  },


  statusCompleted: {
    color: '#16a34a',
  },


  // ----------------------------------------------------------
  // BOTÃO EDITAR
  // ----------------------------------------------------------

  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,

    borderRadius: 7,

    backgroundColor: '#f0f0f0',
  },


  editButtonText: {
    fontSize: 12,

    fontWeight: '600',

    color: '#333',
  },


  // ----------------------------------------------------------
  // LISTA VAZIA
  // ----------------------------------------------------------

  emptyContainer: {
    alignItems: 'center',

    paddingVertical: 40,
  },


  emptyTitle: {
    fontSize: 16,

    fontWeight: 'bold',

    color: '#444',

    marginBottom: 6,
  },


  emptyText: {
    fontSize: 13,

    color: '#777',

    textAlign: 'center',
  },

});
```

