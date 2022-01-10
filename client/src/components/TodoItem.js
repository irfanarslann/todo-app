const TodoItem = ({ todoItem, setTodoModal }) => {
 

  const handleClick = () => {
    setTodoModal(todoItem._id);
  };
  return <div></div>;
};

export default TodoItem;
