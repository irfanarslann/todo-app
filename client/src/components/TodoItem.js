import { useContext, useRef, useState } from "react";
import { TodoContext } from "../contexts/Todo/TodoContext";

const TodoItem = ({ todoItem }) => {
  const [value, setValue] = useState(todoItem.content);
  const [editMode, setEditMode] = useState(true);
  const { deleteTodoItem, updateTodoItem } = useContext(TodoContext);
  const ref = useRef();
  const edit = () => {
    if (editMode) {
      ref.current.readOnly = false;
    }
    if (!editMode) {
      updateTodoItem(todoItem._id, value);
      ref.current.readOnly = true;
    }

    setEditMode(!editMode);
  };

  const deleteTodo = () => {
    deleteTodoItem(todoItem._id);
  };

  return (
    <div className="todo-item">
      <div className="content">
        <input
          ref={ref}
          type="text"
          className="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          readOnly
        />
      </div>
      <div className="actions">
        <button className="edit" onClick={edit}>
          Edit
        </button>
        <button className="delete" onClick={deleteTodo}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
