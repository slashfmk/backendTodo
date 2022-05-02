import express from "express";

const router = express.Router();
const todoController = require("../controllers/todoController");

router.route("/")
    .get(todoController.getAllTodos)
    .post(todoController.addTodo);

router
  .route("/:id")
  .get(todoController.getSpecificTodo)
  .delete(todoController.deleteTodo);

module.exports = router;
