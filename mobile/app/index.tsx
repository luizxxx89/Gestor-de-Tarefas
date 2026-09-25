/*
============================================================
  GERENCIADOR DE TAREFAS - APLICATIVO MOBILE
============================================================
*/

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useEffect, useState } from 'react';

// Endereço do backend no computador
const API_URL = 'http://192.168.3.35:3000';

type TaskStatus = 'Pendente' | 'Em andamento' | 'Concluída';

type Task = {
  id: number;
  title: string;
  status: TaskStatus;
};

// Filtros disponíveis para as tarefas
const FILTERS = [
  'Todas',
  'Pendente',
  'Em andamento',
  'Concluída',
] as const;

export default function HomeScreen() {

  // Buscar as tarefas do backend quando o aplicativo abre
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Tarefas recebidas do backend:', data);
        // Converte os dados do backend 
        // para o formato usado pelo aplicativo
        setTasks(
  data.map((task: any) => ({
    id: task.id,
    title: task.titulo,
    status: task.status,
  }))
);

      })
      .catch((error) => {
        console.error('Erro ao buscar tarefas do backend:', error);
      });
  }, []);

  // Lista temporária de tarefas
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Estudar React Native',
      status: 'Pendente',
    },
    {
      id: 2,
      title: 'Testar aplicativo no celular',
      status: 'Em andamento',
    },
  ]);

  // Guarda o texto digitado no campo de pesquisa
  const [search, setSearch] = useState('');

  // Guarda o nome da nova tarefa
const [newTaskTitle, setNewTaskTitle] = useState('');

  // Guarda o filtro selecionado pelo usuário
const [selectedFilter, setSelectedFilter] =
  useState<(typeof FILTERS)[number]>('Todas');

  // Filtra as tarefas conforme o texto pesquisado
const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(search.toLowerCase())
);

      // Cria uma nova tarefa no backend
  const addTask = () => {

    // Verifica se o campo está vazio
    if (newTaskTitle.trim() === '') {
      return;
    }

    // Envia a nova tarefa para a API
    fetch(`${API_URL}/tasks`, {
      method: 'POST',

      // Informa que estamos enviando JSON
      headers: {
        'Content-Type': 'application/json',
      },

      // Dados enviados para o backend
      body: JSON.stringify({
        titulo: newTaskTitle,
        status: 'Pendente',
      }),
    })
      .then((response) => response.json())
      .then((data) => {

        console.log('Tarefa criada:', data);

        // Limpa o campo depois de criar
        setNewTaskTitle('');

        // Busca novamente as tarefas do banco
        return fetch(`${API_URL}/tasks`);
      })
      .then((response) => response.json())
      .then((data) => {

        // Atualiza a lista do aplicativo
        setTasks(
          data.map((task: any) => ({
            id: task.id,
            title: task.titulo,
            status: task.status,
          }))
        );
      })
      .catch((error) => {
        console.error('Erro ao criar tarefa:', error);
      });
  };

     // Altera o status da tarefa
  const changeStatus = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {

        // Verifica se é a tarefa que foi clicada
        if (task.id === id) {

          // Pendente → Em andamento
          if (task.status === 'Pendente') {
            return {
              ...task,
              status: 'Em andamento',
            };
          }

          // Em andamento → Concluída
          if (task.status === 'Em andamento') {
            return {
              ...task,
              status: 'Concluída',
            };
          }

          // Concluída → Pendente
          return {
            ...task,
            status: 'Pendente',
          };
        }

        // Mantém as outras tarefas
        return task;
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Título */}
      <Text style={styles.title}>
        Gerenciador de Tarefas
      </Text>

      {/* Campo de pesquisa */}
      <TextInput
        style={styles.input}
        placeholder="Pesquisar tarefa..."
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
      />

      {/* Campo para adicionar uma nova tarefa */}
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova tarefa..."
        value={newTaskTitle}
        onChangeText={(text) => setNewTaskTitle(text)}
        autoCapitalize="sentences"
/>

{/* Botão para adicionar a tarefa */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={addTask}
>
      <Text style={styles.addButtonText}>
        Adicionar tarefa
      </Text>
    </TouchableOpacity>

      {/* Lista de tarefas */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>

            <Text style={styles.taskTitle}>
              {item.title}
            </Text>

            <Text>
              Status: {item.status}
            </Text>

            <TouchableOpacity
                style={styles.statusButton}
                onPress={() => changeStatus(item.id)}
>           
              <Text style={styles.statusButtonText}>
                Alterar status
              </Text>
            </TouchableOpacity>

          </View>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },

    addButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 20,
  },

  addButtonText: {
    fontWeight: 'bold',
  },

  taskCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  statusButton: {
  marginTop: 10,
  padding: 10,
  borderRadius: 8,
  alignItems: 'center',
  borderWidth: 1,
  },

  statusButtonText: {
  fontWeight: 'bold',
  },

});