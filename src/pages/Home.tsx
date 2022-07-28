import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundItem = tasks.find((task) => task.title === newTaskTitle);

    if (foundItem) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome!"
      );

      return;
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    } as Task;

    setTasks((oldTasks) => [...oldTasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const foundItem = updatedTasks.find((task) => task.id === id);

    if (foundItem) {
      foundItem.done = !foundItem.done;
    }

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
