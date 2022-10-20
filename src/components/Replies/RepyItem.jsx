import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function ReplyItem({reply}) {
    // setup local state for editing reply.
    const [editMode, setEditMode] = useState(false);
    const [newBody, setNewBody] = useState('');
    // setup access to useDispatch()
    const dispatch = useDispatch();
    // get access to current user id.
    const userid = useSelector(store => store.user.id);
    // used to delete a reply with a given id.
    const deleteReply = (id) => {
        // dispatch to deleteReply saga.
        dispatch({
            type: 'DELETE_REPLY',
            payload: id
        });
    }
    // used to update a comment body.
    const editReply = (id) => {
        if(!newBody) {
            alert('Empty input.');
        } else {
            dispatch({
                type: 'UPDATE_REPLY',
                payload: {
                    replyId: id,
                    newBody
                }
            });
            // clear input
            setNewBody('');
            // close form
            setEditMode(false);
        }
    }

    return (
        <>
        <li key={reply?.id}>User: {reply.username} | Reply: {reply.body} | Likes {reply.likes} | Date: {reply.date}</li>
        {userid === Number(reply.user_id) && 
            <>
            {editMode ? 
            <>
            <input value={newBody} onChange={evt => setNewBody(evt.target.value)} placeholder='Insert'/>
            <button onClick={() => editReply(reply.id)}>Confirm</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
            </> : 
            <> 
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button onClick={() => deleteReply(reply.id)}>Delete</button>
            </>}
            </>}
        </>
    );
}

export default ReplyItem;