import React from 'react'
import http from '../config/axios';

interface CommentProps {
  id: number | undefined
}

const Comment: React.FC<CommentProps> = ({id}) => {
    const [comments, setComments] = React.useState([]);
    
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



  return (
    <div>
      {comments && comments.map((comment: { id: number; body: string }) => (
        <div
          key={comment.id}
          className="container px-3 py-2 mt-2 mx-2 bg-dark rounded-3 shadow-sm"
        >
          <p className="text-sm text-light">{comment.body}</p>
          <div className="d-flex">
            <button className="btn btn-sm btn-transparent text-light" onClick={() => console.log(comment.id)}>Edit</button>
            <button className="btn btn-sm btn-transparent text-light" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment