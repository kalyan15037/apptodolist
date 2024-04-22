import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, CheckBox, Modal, Button, Picker } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles'; // Assuming styles.js is in the same directory
const priorities = ['Normal', 'Important', 'Priority'];

export default function App() {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [tasksList, setTasksList] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const handleAddTask = () => {
    if (task.trim() === '') {
      alert('Please enter a task name.');
      return;
    }

    const newTask = {
      id: editMode ? editTaskId : Math.random().toString(),
      task: task,
      description: description,
      priority: priority,
      deadline: selectedCalendarDate ? moment(selectedCalendarDate).format('MMMM Do YYYY') : 'No Deadline',
      completed: false,
    };

    if (editMode) {
      const updatedTasksList = tasksList.map((item) =>
        item.id === editTaskId ? newTask : item
      );
      setTasksList(updatedTasksList);
      setEditMode(false);
      setEditTaskId(null);
    } else {
      setTasksList([...tasksList, newTask]);
    }

    setTask('');
    setDescription('');
    setPriority('Normal');
    setSelectedCalendarDate(null);
  };

  const handleToggleTask = (taskId) => {
    const updatedTasksList = tasksList.map((item) =>
      item.id === taskId ? { ...item, completed: !item.completed } : item
    );
    setTasksList(updatedTasksList);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasksList = tasksList.filter((item) => item.id !== taskId);
    setTasksList(updatedTasksList);
  };

  const handleEditTask = (taskId, taskName, taskDescription, taskPriority, taskDeadline) => {
    setEditMode(true);
    setEditTaskId(taskId);
    setTask(taskName);
    setDescription(taskDescription);
    setPriority(taskPriority);
    setSelectedCalendarDate(
      taskDeadline !== 'No Deadline' ? moment(taskDeadline, 'MMMM Do YYYY').format('YYYY-MM-DD') : null
    );
  };

  const handleCalendarDayPress = (day) => {
    setSelectedCalendarDate(day.dateString);
    setShowCalendar(false);
  };

  const showCalendarModal = () => {
    setShowCalendar(true);
  };

  const hideCalendarModal = () => {
    setShowCalendar(false);
  };

  // Sort tasks based on deadline before rendering
  const sortedTasks = tasksList.slice().sort((a, b) => {
    if (a.deadline === 'No Deadline') return 1;
    if (b.deadline === 'No Deadline') return -1;
    return moment(a.deadline, 'MMMM Do YYYY').valueOf() - moment(b.deadline, 'MMMM Do YYYY').valueOf();
  });

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Task Manager</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TextInput
          style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, marginRight: 10, paddingHorizontal: 10 }}
          placeholder="Add Task"
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <Picker
          style={{ height: 40, width: 120 }}
          selectedValue={priority}
          onValueChange={(itemValue) => setPriority(itemValue)}
        >
          {priorities.map((p) => (
            <Picker.Item key={p} label={p} value={p} />
          ))}
        </Picker>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', paddingVertical: 10, paddingHorizontal: 20 }}
          onPress={handleAddTask}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{editMode ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Task Description"
        onChangeText={(text) => setDescription(text)}
        value={description}
      />
      <TouchableOpacity
        style={{ marginBottom: 10 }}
        onPress={showCalendarModal}
      >
        <Text style={{ color: 'blue' }}>Deadline: {selectedCalendarDate ? moment(selectedCalendarDate).format('MMMM Do YYYY') : 'No Deadline Selected'}</Text>
      </TouchableOpacity>

      <Modal visible={showCalendar} animationType="slide">
        <View style={{ flex: 1 }}>
          <Calendar
            onDayPress={handleCalendarDayPress}
            current={moment().format('YYYY-MM-DD')}
            markedDates={selectedCalendarDate ? { [selectedCalendarDate]: { selected: true, selectedColor: 'blue' } } : {}}
          />
          <Button title="Select" onPress={hideCalendarModal} />
        </View>
      </Modal>

      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <CheckBox
              value={item.completed}
              onValueChange={() => handleToggleTask(item.id)}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ marginLeft: 10, textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.task}</Text>
              <Text style={{ marginLeft: 10, fontSize: 12, color: 'gray' }}>{item.description}</Text>
              <Text style={{ marginLeft: 10, fontSize: 12, color: 'red' }}>{item.deadline}</Text>
            </View>
            <Text style={{ fontSize: 12, color: getColorByPriority(item.priority), marginRight: 10 }}>{item.priority}</Text>
            <TouchableOpacity onPress={() => handleEditTask(item.id, item.task, item.description, item.priority, item.deadline)}>
              <MaterialIcons name="edit" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

function getColorByPriority(priority) {
  switch (priority) {
    case 'Important':
      return '#FFA500'; // Orange
    case 'Priority':
      return '#FF0000'; // Red
    default:
      return '#00FF00'; // Green
  }
}
