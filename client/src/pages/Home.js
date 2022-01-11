import { useContext, useEffect } from "react";
import TodoContextProvider from "../contexts/Todo/TodoContext";
import { AuthContext } from "../contexts/Auth/AuthContext";
import TodoList from "../components/TodoList";
import Form from "../components/Form";
const Home = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <TodoContextProvider>
      <div className="home-main">
        <header>
          <h1>{user && user.name}'s To do List </h1>
          <Form />
        </header>
        <main>
          <TodoList />
        </main>
        <span className="logout">
          <i className="fa fa-sign-out" onClick={logout} aria-hidden="true"></i>
        </span>
      </div>
    </TodoContextProvider>
  );
};

export default Home;
