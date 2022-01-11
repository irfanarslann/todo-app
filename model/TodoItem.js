const mongoose = require("mongoose");

const TodoItemSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  content: {
    type: String,
  },
});

module.exports = mongoose.model("TodoItem", TodoItemSchema);
