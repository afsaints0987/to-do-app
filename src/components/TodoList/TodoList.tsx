import React from "react";
import { Todo } from "../../types/Todo";
import * as FaIcons from "react-icons/fa";
import http from "../../config/axios";

interface TodoListProps {
  todos: Todo[]; 
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const [editTodoId, setEditTodoId] = React.useState<number | null>(null);

  const handleDeleteTodo = (id: number | undefined) => {
    if (id) {
      http.delete(`/${id}`);
    }
  };

  const handleShowComment = (id: number | undefined) => {
    setTodos((prevTodos: { id: number | undefined; showComment: boolean; }[]) =>
      prevTodos.map((todo: { id: number | undefined; showComment: boolean; }) =>
        todo.id === id ? { ...todo, showComment: !todo.showComment } : todo
      )
    );
  };

  const handleUpdateTodo = async (id: number | undefined) => {
    const todoItem = await http.get(`/${id}`);
    setEditTodoId(todoItem.data.id);
  };

  const handleEditTodoText = (id: number, text: string) => {
    // Update the todo text using the ID
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

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
                    value={todo.text}
                    onChange={(e) =>
                      handleEditTodoText(todo.id, e.target.value)
                    }
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
              <form className="d-flex flex-column mt-2">
                <textarea
                  cols={3}
                  rows={2}
                  className="form-control"
                  placeholder="Comment..."
                />
                <div>
                  <button className="btn btn-transparent btn-sm">Post</button>
                </div>
              </form>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;


