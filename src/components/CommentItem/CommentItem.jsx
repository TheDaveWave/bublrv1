import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CommentItem({comment, ftnId}) {
    // setup local state for reply input.
    const [addingReply, setAddingReply] = useState(false);
    const [newBody, setNewBody] = useState('');
    const [editMode, setEditMode] = useState(false);
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

    // a function to handle adding and editing a comment.
    const handleComment = () => {
        if(!newBody) {
            alert('Missing reply.');
        } else if (editMode) {
            // dispatch to edit a comment.
            dispatch({
                type: 'UPDATE_COMMENT',
                payload: {
                    commentId: comment.id,
                    body: newBody,
                    ftnId
                }
            });
             // clear inputs
             setNewBody('');
             // close form
             setAddingReply(false);
             setEditMode(false);
        } else {
            // dispatch to add a new reply.
            dispatch({
                type: 'ADD_REPLY',
                payload: {
                    commentId: comment.id,
                    body: newBody
                }
            });
            // clear inputs
            setNewBody('');
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
            <input value={newBody} onChange={evt => setNewBody(evt.target.value)} placeholder='Insert'/>
            <button onClick={() => handleComment()}>Add</button>
            <button onClick={() => {setAddingReply(false); setEditMode(false)}}>Cancel</button>
        </div> :
        <div>
            <button onClick={() => setAddingReply(true)}>Reply</button>
            {/* Conditionally render delete button for comment if comment was created by current user */}
            {Number(comment.user_id) === userid && 
                <>
                <button onClick={() => {setAddingReply(true); setEditMode(true)}}>Edit</button>
                <button onClick={() => handleDelete()}>Delete</button>
                </>}
        </div>}
        </>
    );
}

export default CommentItem;