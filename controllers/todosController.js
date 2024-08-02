const Todo = require("../models/todoModel");

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos);
  } catch (err) {
    res.send(400);
  }
};

exports.createTodo = async (req, res) => {
  const todoData = req.body;
  console.log(todoData);
  // Get the JSON data from the request body
  try {
    const newTodo = new Todo(todoData);
    await newTodo.save();
    res.status(201).json(newTodo); // Respond with the created Todo
  } catch (error) {
    res.status(500).json({ error: "Failed to create Todo" });
  }
};

exports.updateTodoItem = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo item not found" });
    }
    const totalTodos = await Todo.find();
    req.status(200).json(totalTodos);
  } catch (err) {
    res.status(500);
  }
};

exports.deleteTodoItem = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    const remainingTodos = await Todo.find();
    if (!todo) {
      res.status(400).send("Todo Item Not Found");
    }
    res.status(200).json(remainingTodos);
  } catch (err) {
    res.status(500).send(err);
  }
};
