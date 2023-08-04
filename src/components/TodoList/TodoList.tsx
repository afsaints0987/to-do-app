import React from "react";
import { Todo } from "../../types/Todo";
import * as FaIcons from "react-icons/fa";
import http from "../../config/axios";
import Comment from "../Comment";

interface TodoListProps {
  todos: Todo[]
  handleDelete: (id: number | undefined) => void;
  handleShow: (id: number | undefined) => void;
}

const TodoList: React.FC<TodoListProps> = ({todos, handleDelete, handleShow}) => {
  const [editTodoId, setEditTodoId] = React.useState<number | undefined>(0);
  const [addComment, setAddComment] = React.useState({
    body:"",
  })
  const [editTodo, setEditTodo] = React.useState("")

  const handleEditTodo = (id: number | undefined) => {
    console.log(id)
    setEditTodoId(id);
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setEditTodo(value)
  }

  const handleUpdateTodo = async (id: number | undefined) => {
    const getTodoItem = await http.get(`tasks/${id}`)
    const todoItem = getTodoItem.data

    if(todoItem.id === editTodoId){
      await http.put(`tasks/${todoItem.id}`, {...todoItem, text: editTodo})
      alert('Update Successful!')
    }
  }

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
                  <label htmlFor="text"></label>
                  <input
                    type="text"
                    name="text"
                    value={editTodo}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                  <button className="btn btn-sm btn-success" onClick={() => handleUpdateTodo(todo.id)}>
                    <FaIcons.FaCheck />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => setEditTodoId(0)}
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
                      onClick={() => handleShow(todo.id)}
                    >
                      Comment
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-warning mx-2"
                      onClick={() => handleEditTodo(todo.id)}
                    >
                      <FaIcons.FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <FaIcons.FaTrash />
                    </button>
                  </div>
                </>
              )}
            </div>
            {todo.showComment && (
              <>
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
            <Comment id={todo.id}/>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;


