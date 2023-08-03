import * as React from "react";
import { Todo } from "../../types/Todo";
import http from "../../config/axios";
import TodoList from "../../components/TodoList/TodoList";

const Dashboard: React.FC = () => {
  const [showTodo, setShowToDo] = React.useState(false);
  const [addTodo, setAddTodo] = React.useState<Todo>({
    id: Math.floor(Math.random() * 100),
    text: "",
  });
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const getTodoList = async () => {
    const getTodo = await http.get("/");
    console.log(getTodo.data);
    setTodos(getTodo.data);
  };

  React.useEffect(() => {
    getTodoList();

    return () => {
      setTodos([]);
    };
  }, []);

  const handleRefresh = React.useCallback(() => {
    getTodoList();
  }, []);

  const handleShowTodo = () => {
    setShowToDo(!showTodo);
  };

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddTodo({
      ...addTodo,
      [name]: value,
    });
  };

  const handleSaveTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!addTodo) {
      alert("Please fill up the todo");
    } else {
      console.log(addTodo);
      http.post("/", addTodo);
    }
    setAddTodo({ text: "" });
    handleRefresh();
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
      <TodoList todos={todos} />
    </div>
  );
};

export default Dashboard;
