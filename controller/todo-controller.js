const Todo = require("../model/Todo");

const getAll = async (req, res) => {
  let todos;
  try {
    todos = await Todo.find();
  } catch (err) {
    return res.status(404).json({ message: "No Todos found" });
  }
  return res.status(200).json({ todo: todos });
};
// GET todos

const deleteTod = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
  } catch (err) {
    return res.status(404).json({ message: "Cannot remove this item " });
  }
  return res.status(202).json({ message: `${id} has been deleted` });
};
// DELETE todo

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, assignee, status } = req.body;
  let todo;
  try {
    todo = await Todo.findById(id);
  } catch (err) {
    return res.json(404).json({ message: "Cannot found todo ):" });
  }
  if (todo) {
    todo.title = title;
    todo.assignee = assignee;
    todo.status = status;
  }
  try {
    await todo.save();
  } catch (err) {
    return res
      .json(406)
      .json({ message: "Cannot change the todo, please try later" });
  }
  return res
    .status(201)
    .json({ message: `${title} has been updated successfully` });
};

const addTodo = async (req, res) => {
  const { title, assignee, status } = req.body;
  const todo = new Todo({
    title,
    assignee,
    status,
  });
  try {
    await todo.save();
  } catch (err) {
    return res
      .status(406)
      .json({ message: "Cannot save the todos , please try again" });
  }
  return res
    .status(201)
    .json({ message: `${title} has been added successfully` });
};

module.exports.addTodo = addTodo;
module.exports.getAll = getAll;
module.exports.updateTodo = updateTodo;
module.exports.deleteTodo = deleteTod;
