const { validationResult } = require("express-validator");
const TodoItem = require("../model/TodoItem");
const mongoose = require("mongoose");
const getTodoItems = async (req, res, next) => {
  try {
    const todos = await TodoItem.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(req.user.id) } },
    ]);
    res.send(todos);
  } catch (err) {
    return res.status(500).send("Server Error 500");
  }
};
const addTodoItem = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { userId, content } = req.body;

    const todoItem = new TodoItem({
      userId,

      content,
    });

    let isSaved = await todoItem.save();
    if (isSaved) {
      console.log("Todo Item Added to User : ", userId);
      return res.status(200).json({ msg: "todoItem Added" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error 500");
  }
};

const deleteTodoItem = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const { todoId } = req.query;

    let isDeleted = await TodoItem.deleteOne({
      _id: mongoose.Types.ObjectId(todoId),
    });
    console.log();
    if (isDeleted.deletedCount > 0) {
      return res.status(200).json({ msg: "Deleted" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "SERVER Error" });
  }
};
const updateTodoItem = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const { todoId, content } = req.body;
    console.log(todoId, content);

    let isUpdate = await TodoItem.updateOne(
      { _id: todoId },
      { $set: { content } }
    );
    if (isUpdate) {
      return res.status(200).json({ msg: "Updated" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "SERVER Error" });
  }
};

module.exports = {
  getTodoItems,
  addTodoItem,
  deleteTodoItem,
  updateTodoItem,
};
