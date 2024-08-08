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
  const user = req.user
  try {
   const todo = await Todo.findOne({_id:id})
   if(todo.author === user._id){
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo item not found" });
    }

   }
   else{
     return res.status(404).json({status:"fail",message:"You can only modify your todos"})
   }
  //  if(todo.author )
    
    const totalTodos = await Todo.find();
    res.status(200).json(totalTodos);
  } catch (err) {
    res.status(500);
  }
};

exports.deleteTodoItem = async (req, res) => {
  const id = req.params.id;
  const user = req.user
 
  try {
    const todo = await Todo.findOne({_id:id})
    console.log(todo,"todo")
    console.log(user,"user")
    
    if(todo.author === user._id){
      const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    const remainingTodos = await Todo.find();
    if (!deletedTodo) {
      return res.status(400).send("Todo Item Not Found");
    }
    res.status(200).json(remainingTodos);

    }
    
  } catch (err) {
    res.status(500).send(err);
  }
};
