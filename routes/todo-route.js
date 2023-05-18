const express = require("express");
const todoController = require("../controller/todo-controller");
const router = express.Router();

router.get("/todo", todoController.getAll);
router.post("/todo", todoController.deleteTodo);
router.post("/todo/add", todoController.addTodo);
router.put("/todo/:id", todoController.updateTodoById);
router.put("/todo", todoController.updateTodo);





module.exports = router