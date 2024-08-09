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
  
  const user = req.user
  
  try {
    const newTodo = new Todo({...todoData,author:user._id});
    await newTodo.save();
    res.status(201).json(newTodo); // Respond with the created Todo
  } catch (error) {
    res.status(500).json({ error: "Failed to create Todo" });
  }
};

exports.updateTodoItem = async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  try {
    const todo = await Todo.findOne({ _id: id });
    
    if (!todo) {
      return res.status(404).json({ error: "Todo item not found" });
    }

    if (todo.author.toString() === user._id.toString()) {
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );

      if (!updatedTodo) {
        return res.status(404).json({ error: "Failed to update Todo item" });
      }
      const allTodos = await Todo.find()
      return res.status(200).json(allTodos);
    } else {
      return res.status(403).json({
        status: "fail",
        message: "You can only modify your todos"
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.deleteTodoItem = async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  try {
    const todo = await Todo.findOne({ _id: id });
    
    if (!todo) {
      return res.status(400).send("Todo Item Not Found");
    }

    if (todo.author.toString() === user._id.toString()) {
      const deletedTodo = await Todo.findByIdAndDelete(id);
      
      if (!deletedTodo) {
        return res.status(400).send("Failed to delete Todo Item");
      }

      const remainingTodos = await Todo.find();
      return res.status(200).json(remainingTodos);
    } else {
      return res.status(403).send("Unauthorized to delete this Todo Item");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
