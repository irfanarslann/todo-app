const { validationResult } = require('express-validator');
const TodoItem = require('../model/TodoItem');

const getTodoItems = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { userId } = req.body;

    const todos = await TodoItem.aggregate([{ $match: { user: userId } }]);
    res.json(todos);
  } catch (err) {
    return res.status(500).send('Server Error 500');
  }
};
const addTodoItem = async (req, res, next) => {
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { userId, title, content, createDate, finishDate } = req.body;

    const todoItem = new TodoItem({
      userId,
      title,
      content,
      createDate,
      finishDate,
    });

    let isSaved = await todoItem.save();
    if (isSaved) {
      console.log('Todo Item Added to User : ', userId);
    }
  } catch (err) {
    return res.status(500).send('Server Error 500');
  }
};

const deleteTodoItem = async () => {
  //TodoItem.deleteOne({_id=})
};

module.exports = {
  getTodoItems,
  addTodoItem,
  deleteTodoItem,
};
