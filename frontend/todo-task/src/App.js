import React, { useState } from 'react';
import './App.css';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';

function App() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [reload, setReload] = useState(false);

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskList
        key={reload}
        onEdit={(task) => setSelectedTask(task)}
      />
    </div>
  );
}

export default App;
