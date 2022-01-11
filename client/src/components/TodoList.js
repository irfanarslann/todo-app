import TodoItem from "./TodoItem";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { TodoContext } from "../contexts/Todo/TodoContext";
import Loading from "./Loading";
import { v4 as uuid } from "uuid";
const TodoList = () => {
  const { todos, loading, getTodoItems } = useContext(TodoContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      if (!todos) {
        getTodoItems();
      }
    }
  }, [user, todos]);
  return (
    <section className="todo-list">
      {loading && <Loading />}

      {!loading && todos && (
        <>
          {todos.length > 0 && <h2>To Do List</h2>}

          {todos.map((todo) => {
            return <TodoItem key={uuid()} todoItem={todo} />;
          })}
        </>
      )}
      {todos && todos.length === 0 && <h3>There is no to do item yet!</h3>}
    </section>
  );
};

export default TodoList;
