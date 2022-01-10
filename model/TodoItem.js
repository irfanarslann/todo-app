const mongoose = require('mongoose');

const TodoItemSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required:true
  },

  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  finishDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('TodoItem', TodoItemSchema);
