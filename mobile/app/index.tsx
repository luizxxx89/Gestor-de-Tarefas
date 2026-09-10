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
  View,
} from 'react-native';

import { useState } from 'react';

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

  // Lista temporária de tarefas
  const [tasks] = useState<Task[]>([
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

  // Guarda o filtro selecionado pelo usuário
const [selectedFilter, setSelectedFilter] =
  useState<(typeof FILTERS)[number]>('Todas');

  // Filtra as tarefas conforme o texto pesquisado
const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(search.toLowerCase())
);

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

});