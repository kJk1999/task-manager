// Todo.js
const mongoose = require('mongoose');

// Define the schema for the Todo model
const todoSchema = new mongoose.Schema({
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  name: {
    type: String,
    required: true, // Title is required
  },
  description: {
    type: String,
    // Description is optional
  },
  release:{
    type: String,
    required: false,
  },
  ticketNumber:{
    type: String,
    required: true,
  },
  status: {
    type:String,
    enum:["Open","Inprogress","Released to QA","Rejected","Completed"],
    default:"Open"
    
  },
 

  
});

// Create the Todo model from the schema
const Todo = mongoose.model('Todo', todoSchema);

// Export the Todo model
module.exports = Todo;
