import React, { useCallback, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import editIcon from "../assets/icons/edit/edit.png";
import xIcon from "../assets/icons/x/x.png";
import trashIcon from "../assets/icons/trash/trash.png";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  task: Task;
  toggleTaskDone: () => void;
  removeTask: () => void;
  editTask: (title: string) => void;
}

export function TaskItem({
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const textInputRef = useRef<TextInput>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  function handleCancelEditing() {
    setIsEditing(false);
    setTitle(task.title);
  }

  function handleSubmitEditing() {
    editTask(title);
    setIsEditing(false);
  }

  const onFocusInput = useCallback(() => {
    if (isEditing && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [isEditing, textInputRef.current]);

  return (
    <>
      <TouchableOpacity
        style={styles.taskButton}
        onPress={onFocusInput}
        activeOpacity={isEditing ? 0.5 : 1}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          onPress={toggleTaskDone}
        >
          {task.done && <Icon name="check" size={12} color="#FFF" />}
        </TouchableOpacity>

        <TextInput
          ref={textInputRef}
          value={title}
          editable={isEditing}
          style={task.done ? styles.taskTextDone : styles.taskText}
          onChangeText={setTitle}
          onSubmitEditing={handleSubmitEditing}
        />
      </TouchableOpacity>

      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing} style={styles.iconX}>
            <Image source={xIcon} style={{ tintColor: "#666" }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Image source={editIcon} style={{ tintColor: "#666" }} />
          </TouchableOpacity>
        )}

        <View style={styles.separator} />

        <TouchableOpacity
          onPress={removeTask}
          disabled={isEditing}
          style={!isEditing ? styles.showIconTrash : styles.hideIconTrash}
        >
          <Image source={trashIcon} style={{ tintColor: "red" }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter_500Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter_500Medium",
  },
  iconX: {
    marginTop: 6,
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    marginHorizontal: 10,
  },
  showIconTrash: { opacity: 1 },
  hideIconTrash: { opacity: 0.2 },
});
