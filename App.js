// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { themes } from "./src/constants/themes/index";
import { List, Modal } from "./src/components/index";


export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState({});

  const onHandleInput = (text) => {
    setTask(text);
  };

  const onHandleSubmit = () => {
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Math.random(), value: task },
    ]);
    setTask("");
  };

  const onHandleDelete = (itemSelected) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== itemSelected.id)
    );
    setItemSelected({});
    setModalVisible(!modalVisible);
  };

  const handleModal = (id) => {
    setItemSelected(tasks.filter((item) => item.id === id)[0]);
    setModalVisible(!modalVisible);
  };


  return (
    <View style={themes.container}>
      <View style={themes.containerTask}>
        <TextInput
          style={themes.textInput}
          placeholder="Crear una nota nueva"
          value={task}
          onChangeText={onHandleInput}
        />
        <Button
          title="Crear"
          onPress={() => onHandleSubmit()}
          disabled={task.length === 0}
        />
      </View>
      <List 
        tasks={tasks}
        onPressItem={handleModal}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => null}
      >
        <View style={themes.modalContent}>
          <View style={themes.modalTitleContainer}>
            <Text>Eliminar nota</Text>
            <TouchableOpacity
              style={themes.deleteButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={themes.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <Text style={themes.modalText}>¿Está seguro?</Text>
          <Text style={themes.modalMessage}>{itemSelected.value}</Text>

          <Button title="Okay" onPress={() => onHandleDelete(itemSelected)} />
        </View>
      </Modal>
    </View>
  );
}

