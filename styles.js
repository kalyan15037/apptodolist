import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7', // Light gray background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark gray text color
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff', // White input background
  },
  addButton: {
    backgroundColor: '#4caf50', // Green button background
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff', // White task item background
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333', // Dark gray task text color
  },
  descriptionText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666', // Gray description text color
  },
  deadlineText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#f44336', // Red deadline text color
  },
  priorityText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#2196f3', // Blue priority text color
  },
  editDeleteButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336', // Red delete button background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 3,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
