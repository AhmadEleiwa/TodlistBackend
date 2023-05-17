const { json } = require("body-parser");
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
  const { ids } = req.body;
  console.log(ids);
  try {
    await Todo.deleteMany({ _id: { $in: [...ids] } });
  } catch (err) {
    return res.status(404).json({ message: "Cannot remove this items" });
  }
  return res
    .status(202)
    .json({ message: `${ids.toString()} has been deleted` });
};
// DELETE todo

const updateTodo = async (req, res) => {
  const { list } = req.body;

  try {
    for (let item of list) {
      await Todo.findByIdAndUpdate(item._id, {title:item.title, assignee:item.assignee, status:item.status});
    }
  } catch (err) {
    return res.json(404).json({ message: "Cannot found todo ):" });
  }
  return res.json({mesage:"working"})
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
