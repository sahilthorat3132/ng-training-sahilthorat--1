import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const getTasks = () => axios.get(`${API_BASE}/tasks`);
export const addTask = (task) => axios.post(`${API_BASE}/task`, task);
export const updateTask = (id, updatedTask) => axios.put(`${API_BASE}/task/${id}`, updatedTask);
export const deleteTask = (id) => axios.delete(`${API_BASE}/task/${id}`);
