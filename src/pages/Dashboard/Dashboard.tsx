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

  const getTodoList = async () => {
    const getTodo = await http.get("/tasks");
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
  const handleShowComment = (id: number | undefined) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, showComment: !todo.showComment } : todo
      )
    );
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
      http.post("/tasks", addTodo);
    }
    setAddTodo({ text: "" });
    handleRefresh();
  };
  
  const handleDeleteTodo = (id: number | undefined) => {
    http.delete(`tasks/${id}`);
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
      <TodoList todos={todos} handleShowComment={handleShowComment} handleDeleteTodo={handleDeleteTodo}/>
    </div>
  );
};

export default Dashboard;
