import React from "react";
import { Todo } from "../../types/Todo";
import * as FaIcons from "react-icons/fa";
import http from "../../config/axios";
import Comment from "../Comment";


const TodoList: React.FC = () => {
  const [editTodoId, setEditTodoId] = React.useState<number | null>(null);
  const [editTodo, setEditTodo] = React.useState("");
  const [addComment, setAddComment] = React.useState({
    body:"",
  })
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

  const handleUpdateTodo = async (id: number | undefined) => {
    const todoItem = await http.get(`/tasks/${id}`);
    setEditTodoId(todoItem.data.id);
  };

  const handleDeleteTodo = async (id: number | undefined) => {
    await http.delete(`/tasks/${id}`);
    handleRefresh
  };

  // Render Comment

  const handleShowComment = (id: number | undefined) => {
    console.log(id)
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, showComment: !todo.showComment } : todo
      )
    );
  };

  const handleAddComment = async (id: number | undefined, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!addComment.body){
      alert("Please enter a valid Comment");
    } else {
      await http.post(`tasks/${id}/comments`, addComment)

      setAddComment({
        body: ""
      })
    }
  }

  return (
    <div id="todo-list" className="mt-5">
      {!todos ? (
        <p>No Data</p>
      ) : (
        todos.map((todo) => (
          <div key={todo.id}>
            <div
              id="todo-item"
              className="bg-light d-flex justify-content-between px-3 py-2 rounded-3 mt-3"
            >
              {editTodoId === todo.id ? (
                <div className="input-group py-0">
                  <input
                    type="text"
                    name="text"
                    value={editTodo}
                    onChange={() => setEditTodo(todo.text)}
                    className="form-control"
                  />
                  <button className="btn btn-sm btn-success">
                    <FaIcons.FaCheck />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => setEditTodoId(null)}
                  >
                    <FaIcons.FaTimes />
                  </button>
                </div>
              ) : (
                <>
                  <div className="d-flex flex-column align-items-start">
                    <p>{todo.text}</p>
                    <button
                      className="btn btn-sm btn-transparent text-primary"
                      onClick={() => handleShowComment(todo.id)}
                    >
                      Comment
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-warning mx-2"
                      onClick={() => handleUpdateTodo(todo.id)}
                    >
                      <FaIcons.FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <FaIcons.FaTrash />
                    </button>
                  </div>
                </>
              )}
            </div>
            {todo.showComment && (
              <form className="d-flex flex-column mt-2" onSubmit={(e) => handleAddComment(todo.id, e)}>
                <textarea
                  cols={3}
                  rows={2}
                  className="form-control"
                  placeholder="Comment..."
                  value={addComment.body}
                  onChange={(e) => setAddComment({body: e.target.value})}
                />
                <div>
                  <button className="btn btn-transparent btn-sm" type="submit">Post</button>
                </div>
              </form>
            )}
            {todo.showComment && <Comment/>}
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;


