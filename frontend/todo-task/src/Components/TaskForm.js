import React, { useState, useEffect } from 'react';
import { addTask, updateTask } from '../Services/taskService';

function TaskForm({ selectedTask, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Normal',
    description: '',
  });

  useEffect(() => {
    if (selectedTask) {
      setForm({
        assignedTo: selectedTask.assignedTo || '',
        status: selectedTask.status || 'Not Started',
        dueDate: selectedTask.dueDate?.substring(0, 10) || '',
        priority: selectedTask.priority || 'Normal',
        description: selectedTask.description || '',
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTask) {
      await updateTask(selectedTask._id, form);
    } else {
      await addTask(form);
    }
    setForm({
      assignedTo: '',
      status: 'Not Started',
      dueDate: '',
      priority: 'Normal',
      description: '',
    });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>{selectedTask ? 'Edit Task' : 'New Task'}</h2>

      <label>
        Assigned To *
        <select name="assignedTo" value={form.assignedTo} onChange={handleChange} required>
          <option value="">Select User</option>
          <option value="User 1">User 1</option>
          <option value="User 2">User 2</option>
        </select>
      </label>

      <label>
        Status *
        <select name="status" value={form.status} onChange={handleChange} required>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </label>

      <label>
        Due Date
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
      </label>

      <label>
        Priority *
        <select name="priority" value={form.priority} onChange={handleChange} required>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      </label>

      <label>
        Description
        <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
      </label>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <button type="button" onClick={onCancel} style={{ marginRight: '10px', backgroundColor: '#f8e9b9' }}>
          Cancel
        </button>
        <button type="submit" style={{ backgroundColor: '#c4c4b8' }}>
          {selectedTask ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;