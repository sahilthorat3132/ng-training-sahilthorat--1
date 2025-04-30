const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post('/task', async (req, res) => {
    const { title, dueDate, priority, description, comment } = req.body;
    const task = new Task({ title, dueDate, priority, description, comment });
    await task.save();
    res.json(task);
  });

router.put('/task/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed, dueDate, priority, description, comment } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, completed, dueDate, priority, description, comment },
      { new: true }
    );
    res.json(updatedTask);
  });

router.delete('/task/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
