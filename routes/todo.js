const express = require('express');
const TodoItemController = require('../controller/TodoItemController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const router = express.Router();

//@router       POST api/auth/
//desc          Get To do items
//access        Private
router.get(
  '/',
  [auth, [check('userId', 'User ID is required').exists()]],
  TodoItemController.getTodoItems
);

//@router       POST api/auth/
//desc          Add new To do item
//access        Private
router.post(
  '/',
  [
    auth,
    [
      check('userId', 'User ID is required').exists(),
      check('title', 'Title is required').exists(),
      check('finishDate', 'Finish Date is required').exists(),
    ],
  ],
  TodoItemController.addTodoItem
);

//@router       DELETE api/auth/
//desc          Delete todo item
//access        Private
router.delete('/', auth);

module.exports = router;
