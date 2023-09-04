// routes/todos.js

const express = require('express');
const router = express.Router();

// Import the Todo model and any other necessary dependencies
const { Todo } = require('../models');

// Define your routes and controller functions
router.post('/', async (req, res) => {
  try {
    // Create a new Todo using the request body
    const newTodo = await Todo.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Todo' });
  }
});

router.get('/', async (req, res) => {
  try {
    // Fetch all Todos from the database
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch Todos' });
  }
});

router.get('/:id', async (req, res) => {
  const todoId = req.params.id;

  try {
    // Find a Todo by its ID
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch Todo' });
  }
});

router.put('/:id', async (req, res) => {
  const todoId = req.params.id;

  try {
    // Find a Todo by its ID and update it
    const [updatedRows] = await Todo.update(req.body, {
      where: { id: todoId },
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Unable to update Todo' });
  }
});

router.delete('/:id', async (req, res) => {
  const todoId = req.params.id;

  try {
    // Find a Todo by its ID and delete it
    const deletedRowCount = await Todo.destroy({ where: { id: todoId } });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete Todo' });
  }
});

module.exports = router;
