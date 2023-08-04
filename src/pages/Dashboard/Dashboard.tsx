import * as React from "react";
import { Todo } from "../../types/Todo";
import http from "../../config/axios";
import TodoList from "../../components/TodoList/TodoList";

const Dashboard: React.FC = () => {
  const [showTodo, setShowToDo] = React.useState(false);
  const [addTodo, setAddTodo] = React.useState<Todo>({
    id: Math.floor(Math.random() * 1000),
    text: "",
  });
  const [todos, setTodos] = React.useState<Todo[]>([]);
  let userData: { username: string };
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    userData = JSON.parse(storedUser);
  }

  const getTodoList = async () => {
    const getTodo = await http.get(`/tasks`);
    const todoItems = getTodo.data;
    const filteredTodos = todoItems.filter(
      (todo: { author: string }) => todo.author === userData.username
    );
    setTodos(filteredTodos);
  };

  // Get TO-DO List

  React.useEffect(() => {
    getTodoList();

    return () => {
      setTodos([]);
    };
  }, []);

  const handleRefresh = React.useCallback(() => {
    getTodoList();
  }, []);

  const handleDeleteTodo = async (id: number | undefined) => {
    await http.delete(`/tasks/${id}`);
    handleRefresh();
  };

  // Render Comment

  const handleShowComment = (id: number | undefined) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, showComment: !todo.showComment } : todo
      )
    );
  };


  const handleShowTodo = () => {
    setShowToDo(!showTodo);
  };


  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddTodo({
      ...addTodo,
      [name]: value,
      author: userData.username
    });
  };

  const handleSaveTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!addTodo) {
      alert("Please fill up the todo");
    } else {
      await http.post('tasks', addTodo)
      alert("Task Added")
      setAddTodo({ ...addTodo, text: "" });
      handleRefresh();
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-5" id="todo">
        <h3>My to-do list</h3>
        <button className="btn btn-danger" onClick={handleShowTodo}>
          {showTodo ? "Close" : "Add"}
        </button>
      </div>
      {showTodo && (
        <form onSubmit={handleSaveTodo}>
          <div className="form-group">
            <label htmlFor="task" className="form-label">
              Add Todo
            </label>
            <input
              name="text"
              type="text"
              value={addTodo.text}
              className="form-control"
              onChange={handleTodoChange}
            />
          </div>
          <button className="btn btn-sm btn-danger mt-2" type="submit">
            Save
          </button>
        </form>
      )}
      <TodoList todos={todos} handleDelete={handleDeleteTodo} handleShow={handleShowComment}/>
    </div>
  );
};

export default Dashboard;
