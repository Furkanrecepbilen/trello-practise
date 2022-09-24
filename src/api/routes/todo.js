const express = require("express");
const Router = express.Router();
const { authenticateToken } = require("../middlewares/auth");
const TodoController = require("../controllers/todo");
const TodoValidator = require("../validators/todo");

Router.post(
  "/create-todo",
  authenticateToken,
  TodoValidator.validateCreateTodo,
  TodoValidator.validateCreateTodoStatus,
  TodoController.createTodo
);

Router.get("/list-todo", authenticateToken, TodoController.listTodo);

Router.put(
  "/:id/update-todo",
  authenticateToken,
  TodoValidator.validateUpdateTodo,
  TodoValidator.validateUpdateTodoStatus,
  TodoController.updateTodo
);

Router.delete("/:id/delete-todo", authenticateToken, TodoController.deleteTodo);

Router.post(
  "/comment/:id",
  authenticateToken,
  TodoValidator.validateCreateComment,
  TodoValidator.validateCreateCommentStatus,
  TodoController.createComment
);

Router.put("/like/:id", authenticateToken, TodoController.likeTodo);

module.exports = Router;
