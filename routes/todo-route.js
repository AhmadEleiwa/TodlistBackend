const express = require("express");
const todoController = require("../controller/todo-controller");
const router = express.Router();

router.get("/todo", todoController.getAll);
router.delete("/todo", todoController.deleteTodo);
router.post("/todo", todoController.addTodo);
router.put("/todo/:id", todoController.updateTodo);



module.exports = router