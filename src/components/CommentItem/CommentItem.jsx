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

    // handles the deleting of a comment on button click.
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
        if(!replyBody) {
            alert('Missing reply.');
        } else {
            dispatch({
                type: 'ADD_REPLY',
                payload: {
                    commentId: comment.id,
                    body: replyBody
                }
            });
             // clear inputs
            setReplyBody('');
            // close form
            setAddingReply(false);
        }
    }

    return (
        <>
        <li>ID: {comment.id} | User: {comment.username} | Comment: {comment.body} | Likes: {comment.likes} | Date: {comment.date}</li>
        {/* Conditionally render reply and delete buttons if addingReply is false or reply form if addingReply is true */}
        {addingReply ? 
        <div>
            <input value={replyBody} onChange={evt => setReplyBody(evt.target.value)} placeholder='Add Reply'/>
            <button onClick={() => handleReply()}>Add</button>
            <button onClick={() => setAddingReply(false)}>Cancel</button>
        </div> :
        <div>
            <button onClick={() => setAddingReply(true)}>Reply</button>
            {/* Conditionally render delete button for comment if comment was created by current user */}
            {Number(comment.user_id) === userid && <button onClick={() => handleDelete()}>Delete</button>}
        </div>}
        </>
    );
}

export default CommentItem;