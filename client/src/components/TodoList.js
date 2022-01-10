import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { TodoContext } from "../contexts/Todo/TodoContext";
import Button from "./Button";
import Form from "./Form";
import Loading from "./Loading";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todos, loading, getTodoItems } = useContext(TodoContext);
  const { user } = useContext(AuthContext);
  const [todoModal, setTodoModal] = useState(true);
  useEffect(() => {
    if (user) {
      if (!todos) {
        getTodoItems();
      }
    }
  }, [user, todos]);

  return (
    <div className={`todolist`}>
      {loading && <Loading />}
      {!loading &&
        todos &&
        todos.map((todo) => {
          return (
            <>
              <TodoItem todoItem={todo} />
            </>
          );
        })}
      {todos && todos.length === 0 && (
        <h3
          style={{
            textAlign: "center",
            marginTop: "20px",
            backgroundColor: "#F8D7DA",
            borderColor: "#ffeeba",
            borderRadius: "5px",
            fontSize: "15px",
            padding: "10px",
            textTransform: "capitalize",
            marginBottom: "25px",
            fontWeight: "400",
            color: "#881C24",
          }}
        >
          There is no todo item yet!
        </h3>
      )}
    </div>
  );
};

export default TodoList;
