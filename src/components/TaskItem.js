import React from 'react';
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';

export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.info}>
        <Text style={styles.title}>{task.title}</Text>
        <Text>{task.description}</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.actions}>
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" onPress={onDelete} color="red" />
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
});
