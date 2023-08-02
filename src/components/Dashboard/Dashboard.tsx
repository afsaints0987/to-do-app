import * as React from "react";
import * as FaIcons from "react-icons/fa";
import { Todo } from "../../types/Todo";
import http from "../../config/axios"

const Dashboard: React.FC = () => {
  const [showTodo, setShowToDo] = React.useState(false);
  const [addTodo, setAddTodo] = React.useState<Todo>({
    id: Math.floor(Math.random() * 100),
    text: ""
  });
  const [todos, setTodos] = React.useState<Todo[]>([])

  const getTodoList = async() => {
    const getTodo = await http.get('/')
    console.log(getTodo.data);
    setTodos(getTodo.data)
    }

  React.useEffect(() => {
    getTodoList()

    return () => {
        setTodos([])
    }
  },[])

  const handleRefresh = React.useCallback(() => {
    getTodoList();
  },[])

  const handleShowTodo = () => {
    setShowToDo(!showTodo);
  };

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAddTodo({
      ...addTodo,
      text: value,
    });
  };

  const handleSaveTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!addTodo) {
      alert("Please fill up the todo");
    } else {
        console.log(addTodo)
        http.post('/', addTodo)
    }
    setAddTodo({text: ""})
    handleRefresh();
  };

  const handleDeleteTodo = (id: number) => {
    if(id){
        http.delete(`/${id}`)
        handleRefresh();
    }
  }

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
              name="task"
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
      <div id="todo -list" className="mt-5">
            {!todos ? <p>No Data</p> : todos.map(todo => (
                <div key={todo.id}id="todo-item" className="bg-light d-flex justify-content-between px-3 py-2 rounded-3 mt-3">
                    <div className="d-flex flex-column align-items-start">
                        <p>{todo.text}</p>
                        <button className="btn btn-sm btn-transparent text-primary">
                        Comment
                        </button>
                    </div>
                    <div>
                        <button className="btn btn-sm btn-warning mx-2">
                        <FaIcons.FaEdit />
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={() => handleDeleteTodo(todo.id)}>
                        <FaIcons.FaTrash />
                        </button>
                    </div>
                </div>
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
