const express = require("express");
const TodoItemController = require("../controller/TodoItemController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const router = express.Router();

//@router       POST api/todo/
//desc          Get To do items
//access        Private
router.get(
  "/",
  [auth, [check("userId", "User ID is required").exists()]],
  TodoItemController.getTodoItems
);

//@router       POST api/todo/
//desc          Add new To do item
//access        Private
router.post(
  "/",
  [
    auth,
    [
      check("userId", "User ID is required").exists(),
      check("content", "Title is required").exists(),
    ],
  ],
  TodoItemController.addTodoItem
);

//@router       DELETE api/todo/
//desc          Delete todo item
//access        Private
router.delete(
  "/",
  auth,
  check("todoId", "Todo Id is reqiured").exists(),
  TodoItemController.deleteTodoItem
);

//@router       PUT api/todo/
//desc          Update todo item
//access        Private
router.put(
  "/",
  auth,
  check("todoId", "Todo Id is reqiured").exists(),
  check("content", "content is reqiured").exists(),
  TodoItemController.updateTodoItem
);

module.exports = router;
