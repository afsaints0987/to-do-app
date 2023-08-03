import React from "react";
import { Todo } from "../../types/Todo";
import * as FaIcons from "react-icons/fa";
import http from "../../config/axios";
import Comment from "../Comment";

interface TodoListProps {
  todos: Todo[];
  handleShowComment: (id: number | undefined) => void;
  handleDeleteTodo: (id: number | undefined) => void; 
}

const TodoList: React.FC<TodoListProps> = ({ todos, handleShowComment, handleDeleteTodo }) => {
  const [editTodoId, setEditTodoId] = React.useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editTodo, setEditTodos] = React.useState<Todo[]>([]);
  const [addComment, setAddComment] = React.useState({
    comment_body:"",
  })


  const handleUpdateTodo = async (id: number | undefined) => {
    const todoItem = await http.get(`/tasks/${id}`);
    setEditTodoId(todoItem.data.id);
  };

  const handleEditTodoText = (id: number, text: string) => {
    setEditTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!addComment.comment_body){
      alert("Please enter a valid Comment");
    } else {
      await http.post('/comments', addComment)

      setAddComment({
        comment_body: ""
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
                    value={todo.text}
                    onChange={(e) =>
                      handleEditTodoText(editTodoId, e.target.value)
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
              <form className="d-flex flex-column mt-2" onSubmit={handleAddComment}>
                <textarea
                  cols={3}
                  rows={2}
                  className="form-control"
                  placeholder="Comment..."
                  value={addComment.comment_body}
                  onChange={(e) => setAddComment({comment_body: e.target.value})}
                />
                <div>
                  <button className="btn btn-transparent btn-sm" type="submit">Post</button>
                </div>
              </form>
            )}
          </div>
        ))
      )}
      <Comment/>
    </div>
  );
};

export default TodoList;


