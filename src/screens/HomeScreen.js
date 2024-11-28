import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import TaskItem from "../components/TaskItem";

const API_URL = "http://10.68.152.229:3000/tasks";

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as tarefas.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar a tarefa.");
    }
  };

  const handleEditTask = (task) => {
    navigation.navigate("Edit Task", { task, onUpdate: fetchTasks });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Add Task", { onTaskAdded: fetchTasks })} // Passa a função para atualização
      >
        <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onEdit={() => handleEditTask(item)}
            onDelete={() => handleDeleteTask(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  list: {
    marginTop: 20,
  },
});
