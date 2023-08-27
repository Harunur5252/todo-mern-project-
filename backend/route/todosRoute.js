const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  getTodos,
  setTodos,
  updateTodo,
  deleteTodo,
  getAuthUserTodos,
} = require("../controller/todosController");
const router = express.Router();

router.route("/").get(requireAuth, getTodos).post(requireAuth, setTodos);
router
  .route("/:id")
  .put(requireAuth, updateTodo)
  .delete(requireAuth, deleteTodo);
router.get("/user/todos", requireAuth, getAuthUserTodos);
module.exports = router;
