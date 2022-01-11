import axios from "axios";
import { createContext, useReducer } from "react";
import TodoReducer from "./TodoReducer";
import { EP_TODOS } from "../endpoints";
import { AT_GET_TODOS, AT_SET_LOADING } from "../types";
import { config } from "../../utils/HttpConfig";
import setAuthToken from "../../utils/setAuthToken";
export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const initialState = {
    todos: null,
    loading: null,
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  //Get Todo Items
  const getTodoItems = async () => {
    try {
      setLoading();
      const todos = await axios.get(EP_TODOS);
      dispatch({ type: AT_GET_TODOS, payload: todos.data });
    } catch (err) {
      console.error(err);
    }
  };

  //Add Todo Item
  const addTodoItem = async (todoData) => {
    try {
      const payload = todoData;

      const addTodo = await axios.post(EP_TODOS, payload, config);

      if (addTodo) {
        getTodoItems(todoData.userId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //Delete Todo Item
  const deleteTodoItem = async (todoId) => {
    try {
      const deleteItem = await axios.delete(EP_TODOS, {
        params: { todoId },
      });
      if (deleteItem) {
        getTodoItems();
      }
    } catch (err) {
      console.error(err);
    }
  };
  //Update Todo Item
  const updateTodoItem = async (todoId, content) => {
    console.log(todoId);
    try {
      const updateItem = await axios.put(EP_TODOS, { todoId, content });
      if (updateItem) {
        getTodoItems();
      }
    } catch (err) {
      console.error(err);
    }
  };

  //Set Loading
  const setLoading = () => {
    dispatch({ type: AT_SET_LOADING });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        getTodoItems,
        addTodoItem,
        deleteTodoItem,
        updateTodoItem,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
