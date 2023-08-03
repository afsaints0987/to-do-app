import React from 'react'
import http from '../config/axios';

const Comment: React.FC = () => {
    const [comments, setComments] = React.useState([]);
    
    const getComments = async () => {
        const commentItem = await http.get('comments');
        setComments(commentItem.data);
    }
    React.useEffect(() => {
        getComments();
    },[])


  return (
    <div>
      {comments.map((comment: { id: number; body: string }) => (
        <div
          key={comment.id}
          className="container px-3 py-2 mt-2 mx-2 bg-dark rounded-3 shadow-sm"
        >
          <p className="text-sm text-light">{comment.body}</p>
          <div className="d-flex">
            <button className="btn btn-sm btn-transparent text-light">Edit</button>
            <button className="btn btn-sm btn-transparent text-light">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment