import { useContext, useState } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { TodoContext } from "../contexts/Todo/TodoContext";

const Form = () => {
  const { addTodoItem } = useContext(TodoContext);

  const [content, setContent] = useState(null);

  const { user } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    addTodoItem({ content, userId: user._id });
    setContent('');
  };

  return (
    <form className="new-todo-form" onSubmit={(e) => submitHandler(e)}>
      <input
        type="text"
        name="new-todo-input"
        className="new-todo-input"
        placeholder="What do you have planned?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input type="submit" className="new-todo-submit" value="Add To do" />
    </form>
  );
};

export default Form;
