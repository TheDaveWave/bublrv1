import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CommentItem({comment, ftnId}) {
    // setup local state for reply input.
    const [addingReply, setAddingReply] = useState(false);
    const [replyBody, setReplyBody] = useState('');
    // access useDispatch()
    const dispatch = useDispatch();
    // get current user
    const userid = useSelector(store => store.user.id);
    // console.log(userid);

    const handleDelete = () => {
        dispatch({
            type: 'DELETE_COMMENT',
            payload: {
                commentId: comment.id,
                ftnId
            }
        });
    }

    // a function to handle adding a reply.
    const handleReply = () => {

    }

    return (
        <>
        <li>ID: {comment.id} | User: {comment.username} | Comment: {comment.body} | Likes: {comment.likes} | Date: {comment.date}</li>
        {addingReply ? 
        <div>
            <input placeholder='Add Reply'/>
            <button onClick={() => handleReply()}>Add</button>
            <button onClick={() => setAddingReply(false)}>Cancel</button>
        </div> :
        <div>
            <button onClick={() => setAddingReply(true)}>Reply</button>
            {Number(comment.user_id) === userid && <button onClick={() => handleDelete()}>Delete</button>}
        </div>}
        </>
    );
}

export default CommentItem;