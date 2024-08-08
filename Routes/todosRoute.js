const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController')
const authController = require('../controllers/authController')

router.route('/',).get(todosController.getAllTodos).post(authController.authUser,todosController.createTodo) // user can add and get
router.route('/:id').patch(authController.authUser,todosController.updateTodoItem).delete(authController.authUser,todosController.deleteTodoItem) // authenticated User only edit and delete

module.exports = router