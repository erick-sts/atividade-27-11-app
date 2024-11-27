import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
  Alert,
} from "react-native";
import axios from "axios";
import TaskItem from "./src/components/TaskItem";
import TaskForm from "./src/components/TaskForm";

const API_URL = "http://10.68.152.229:3000/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      await axios.post(API_URL, task);
      fetchTasks();
      setIsFormVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to create task");
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedTask);
      fetchTasks();
      setTaskToEdit(null);
      setIsFormVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      Alert.alert("Erro", "Não foi possivel deletar a tarefa!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isFormVisible ? (
        <TaskForm
          onSubmit={
            taskToEdit ? (task) => updateTask(taskToEdit.id, task) : addTask
          }
          initialData={taskToEdit}
          onCancel={() => {
            setTaskToEdit(null);
            setIsFormVisible(false);
          }}
        />
      ) : (
        <>
          <Button
            title="Adicionar Tarefa"
            onPress={() => setIsFormVisible(true)}
          />
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskItem
                task={item}
                onEdit={() => {
                  setTaskToEdit(item);
                  setIsFormVisible(true);
                }}
                onDelete={() => deleteTask(item.id)}
              />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
