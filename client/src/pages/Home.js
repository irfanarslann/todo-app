import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";
import TodoList from "../components/TodoList";
import Form from "../components/Form";
const Home = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="home-main">
      <div className="content-main">
        <div className="title">
          <div></div>
          <h1>Todo List</h1>

          <span onClick={logout}>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </span>
        </div>

        <Form />
        <TodoList />
      </div>
    </div>
  );
};

export default Home;
