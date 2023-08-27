const expressAsyncHandler = require("express-async-handler");
const Todo = require("../model/todos");
const User = require("../model/user");

const getTodos = expressAsyncHandler(async (req, res) => {
  const todos = await Todo.find({});
  if (!todos) {
    res.status(404);
    throw new Error("todos not found");
  }
  return res.status(200).json(todos);
});

const setTodos = expressAsyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;
  const user = req.user;

  // if user not found
  if (!user || !userId) {
    res.status(404);
    throw new Error("user not found");
  }
  // if body data not found
  if (!title || !description) {
    res.status(404);
    throw new Error("Please add all fields");
  }

  const todos = await Todo.create({ title, description, user: userId });
  user.todos.push(todos._id);
  await user.save();
  // if todos not found
  if (!todos) {
    res.status(404);
    throw new Error("todos not found");
  }
  return res.status(201).json(todos);
});

const updateTodo = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findById(id);
  // if todo not found
  if (!todo) {
    res.status(404);
    throw new Error("todo not found");
  }

  // if user not found
  if (!req.user) {
    res.status(404);
    throw new Error("User not found");
  }
  // if user not authorized
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // update todo
  todo.title = req.body.title;
  todo.description = req.body.description;
  const updatedTodo = await todo.save();

  return res.status(201).json(updatedTodo);
});

const deleteTodo = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const todo = await Todo.findById(id);

  // if todo not found
  if (!todo) {
    res.status(404);
    throw new Error("todo not found");
  }

  // if user not found
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  // if user not authorized
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // finding todo index number form user when a todo delete then same time that todo will be deleted from user.

  const todoIndex = user?.todos?.findIndex((item) => {
    if (item.toString() === todo._id.toString()) {
      return item;
    }
  });

  const deletedTodo = await Todo.findByIdAndDelete(todo._id);
  user?.todos?.splice(todoIndex, 1);
  await user.save();
  return res.status(200).json(deletedTodo);
});
const getAuthUserTodos = expressAsyncHandler(async (req, res) => {
  const user = req?.user;
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  if (!user.todos) {
    res.status(404);
    throw new Error("user todos not found");
  }

  let todos = [];
  for (const item of user?.todos) {
    const res = await Todo.findById(item);
    todos.push(res);
  }
  return res.json(todos);
});
module.exports = {
  getTodos,
  setTodos,
  updateTodo,
  deleteTodo,
  getAuthUserTodos,
};
