import React from 'react'
import http from '../config/axios';
import * as FaIcons from 'react-icons/fa';

interface CommentProps {
  id: number | undefined
}

const Comment: React.FC<CommentProps> = ({id}) => {
    const [comments, setComments] = React.useState([]);
    const [editCommentItem, setEditCommentItem] = React.useState("")
    const [editCommentId, setEditCommentId] = React.useState<number | undefined>(0)
    const getComments = async () => {
        const commentItems = await http.get('comments');
        const commentItem = commentItems.data;
        const filteredComment = commentItem.filter((comment: { taskId: string | number; }) => +comment.taskId === id)
        setComments(filteredComment)
    }
    React.useEffect(() => {
        getComments();
    },[])

    const handleCommentRefresh = React.useCallback(() => {
        getComments();
    },[])

    const handleDeleteComment = async (id: number | undefined) => {
      if(id) {
        await http.delete(`comments/${id}`)
        alert("Comment Deleted")
        handleCommentRefresh();
      }
    }

    const handleEditCommentId = (id: number | undefined) => {
      console.log(id)
      setEditCommentId(id)
    }

    const handleUpdateComment = async (id: number | undefined) => {
      const getCommentItem = await http.get(`/comments/${id}`)
      const commentItem = getCommentItem.data

      console.log(editCommentItem)

      if(commentItem.id === editCommentId){
        await http.put(`/comments/${commentItem.id}`, {...commentItem, body: editCommentItem})
        alert('Comment Updated')
        setEditCommentId(0);
        handleCommentRefresh();
      }
    }


  return (
    <div>
      {comments && comments.map((comment: { id: number; body: string }) => (
        <div
          key={comment.id}
          className="container px-3 py-2 mt-2 mx-2 bg-dark rounded-3 shadow-sm"
        > {editCommentId === comment.id ? <div className="input-group">
          <label htmlFor="comment"></label>
          <textarea name="comment" cols={3} rows={2} className="form-control" onChange={(e) => setEditCommentItem(e.target.value)}/>
          <button className="btn btn-sm btn-light" onClick={() => handleUpdateComment(comment.id)}><FaIcons.FaCheck/></button>
          <button className="btn btn-sm btn-danger" onClick={() => setEditCommentId(0)}><FaIcons.FaTimes/></button>
        </div> : <><p className="text-sm text-light">{comment.body}</p>
          <div className="d-flex">
            <button className="btn btn-sm btn-transparent text-light" onClick={() => handleEditCommentId(comment.id)}>Edit</button>
            <button className="btn btn-sm btn-transparent text-light" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
          </div></>}
        </div>
      ))}
    </div>
  );
}

export default Comment