import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch todos when the app loads
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/api/todos')
      .then(response => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching todos');
        setLoading(false);
      });
  }, []);

  // Handle form submission to add a new todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    setLoading(true);
    axios.post('http://localhost:5000/api/todos', { title })
      .then(response => {
        setTodos([...todos, response.data]);
        setTitle('');
        setLoading(false);
      })
      .catch(err => {
        setError('Error adding todo');
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a new todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      <h2>Todos List</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <strong>{todo.title}</strong> <span>{new Date(todo.createdAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
