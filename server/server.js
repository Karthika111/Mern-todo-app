const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize app
const app = express();
const port = 5000;  // Backend server port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Todo Schema
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Todo Model
const Todo = mongoose.model('Todo', todoSchema);

// API Routes

// POST: Add a new todo
app.post('/api/todos', async (req, res) => {
    try {
        const { title } = req.body;
        const newTodo = new Todo({
            title
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ error: 'Error creating todo' });
    }
});

// GET: Fetch all todos
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching todos' });
    }
});

// Start server
app.listen(5000, () => {
    console.log(`Backend running on http://localhost:5000`);
});
