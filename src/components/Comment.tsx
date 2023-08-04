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

    const handleCommentRefresh = React.useCallback(() => {
        getComments();
    },[])


  return (
    <div>
        {
            comments.map((comment: {id: number; comment_body: string}) => (
                <div key={comment.id} className="container px-3 py-2 mt-2 bg-secondary rounded-3">
                    <p className="text-sm text-light">{comment.comment_body}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Comment