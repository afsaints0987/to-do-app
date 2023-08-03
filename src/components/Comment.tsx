import React from 'react'
import http from '../config/axios';

const Comment: React.FC = () => {
    const [comments, setComments] = React.useState([]);

    React.useEffect(() => {
        const getComments = async () => {
            const commentItem = await http.get('comments');
            console.log(commentItem.data);
        }
        getComments();
    },[])

  return (
    <div>Comment</div>
  )
}

export default Comment