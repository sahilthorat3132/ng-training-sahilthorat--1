
import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../Services/taskService';
import TaskForm from './TaskForm';

function TaskList({ onEdit }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const filteredTasks = tasks.filter(task =>
    (task.assignedTo || '').toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    loadTasks();
  }, []);

  const handleNewTaskClick = () => {
    setShowTaskForm(true);
    setSelectedTask(null);
  };

  const handleEditTaskClick = (task) => {
    setShowTaskForm(true);
    setSelectedTask(task);
  };

  const handleTaskFormClose = () => {
    setShowTaskForm(false);
  };

  const handleTaskFormSuccess = () => {
    setShowTaskForm(false);
    loadTasks();
  };

  return (
    <div>
      <h2>Tasks</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div>
          <button onClick={handleNewTaskClick}>New Task</button>
          <button onClick={loadTasks}>Refresh</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th></th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task._id}>
              <td><input type="checkbox" /></td>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>{task.priority}</td>
              <td>{task.description}</td>
              <td style={{ position: 'relative' }}>
                <button onClick={() => toggleDropdown(task._id)}>⋮</button>
                {dropdownOpen === task._id && (
                  <div style={{
                    position: 'absolute',
                    background: 'white',
                    border: '1px solid #ccc',
                    padding: '5px',
                    right: 0,
                    zIndex: 1,
                  }}>
                    <div style={{ cursor: 'pointer' }} onClick={() => handleEditTaskClick(task)}>Edit</div>
                    <div style={{ cursor: 'pointer' }} onClick={() => handleDelete(task._id)}>Delete</div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <select>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div>
          <button disabled>First</button>
          <button disabled>Prev</button>
          <span>1</span>
          <button disabled>Next</button>
          <button disabled>Last</button>
        </div>
      </div>

      {showTaskForm && (
        <TaskForm
          selectedTask={selectedTask}
          onSuccess={handleTaskFormSuccess}
          onCancel={handleTaskFormClose} 
        />
      )}
    </div>
  );
}

export default TaskList;
