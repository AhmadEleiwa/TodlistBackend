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
  console.log(req.body);
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
const updateTodoById = async (req, res) => {
  const { id } = req.params;
  const { title, assignee, status } = req.body;
  try {
    await Todo.findByIdAndUpdate(id, { title, assignee, status });
  } catch (err) {
    return res.json({ message: "errr" });
  }
  return res.json({ todo: await Todo.find() });
};

const updateTodo = async (req, res) => {
  const { list } = req.body;
  console.log(list);
  try {
    for (let item of list) {
      await Todo.findByIdAndUpdate(item._id, {
        title: item.title,
        assignee: item.assignee,
        status: item.status,
      });
    }
  } catch (err) {
    return res.json(404).json({ message: "Cannot found todo ):" });
  }
  return res.json({ todo: await Todo.find() });
};

const addTodo = async (req, res) => {
  console.log('add todo endpoint requested....')
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
module.exports.updateTodoById = updateTodoById;

module.exports.deleteTodo = deleteTod;
