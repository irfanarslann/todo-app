import { useContext, useState } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { TodoContext } from "../contexts/Todo/TodoContext";
import Button from "./Button";

const Form = () => {
  const { addTodoItem } = useContext(TodoContext);

  const [content, setContent] = useState(null);

  const { user } = useContext(AuthContext);
  const submitHandler = (e) => {
    e.preventDefault();
    addTodoItem({ content, userId: user._id });
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={(e) => submitHandler(e)}>
        <input
          type="textarea"
          name="content"
          placeholder="Todoo"
          maxLength="50"
          required={true}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button
          style={{
            marginLeft: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            fontSize: "15px",
            fontWeight: "500",
          }}
          buttonText="Save"
        />
      </form>
    </div>
  );
};

export default Form;
