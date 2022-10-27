import { Button, Chip, Input, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from "@mui/system";

function CommentItem({comment, ftnId}) {
    // setup local state for reply input.
    const [addingReply, setAddingReply] = useState(false);
    const [newBody, setNewBody] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [open, setOpen] = useState(false);
    // access useDispatch()
    const dispatch = useDispatch();
    // get current user
    const userid = useSelector(store => store.user.id);
    // console.log(userid);
    let date = comment.date;

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
        <ListItem>
            <Stack direction='row' justifyContent='space-evenly'>
            <ListItemText 
                primary={comment.username}
                secondary={comment.body}
            />
            <ListItemText 
                secondary={comment.date}
            />
            </Stack>
            {/* ID: {comment.id} | User: {comment.username} | Comment: {comment.body} | Date: {comment.date} */}
        </ListItem>
        {/* Conditionally render reply and delete buttons if addingReply is false or reply form if addingReply is true */}
        <Stack direction='row' justifyContent='space-evenly' alignItems='center'>
        {addingReply ? 
        <>
            <Input sx={{ml: 2}} value={newBody} onChange={evt => setNewBody(evt.target.value)} placeholder='Add a reply...'/>
            <Button onClick={() => handleComment()}>Add</Button>
            <Button onClick={() => {setAddingReply(false); setEditMode(false)}}>Cancel</Button>
        </> :
        <>
            <Button onClick={() => setAddingReply(true)}>Reply</Button>
            {/* Conditionally render delete button for comment if comment was created by current user */}
            {Number(comment.user_id) === userid && 
            <>
                <Button onClick={() => {setAddingReply(true); setEditMode(true)}}>Edit</Button>
                <Button startIcon={<DeleteIcon />} onClick={() => handleDelete()}>Delete</Button>
            </>}
        </>}
        </Stack>
        <Chip 
            sx={{mt: 1, ml: 2}}
            size='small'
            variant='filled'
            color='primary'
            onClick={() => setOpen(!open)} 
            icon={open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />} 
            label='replies'
        />
        </>
    );
}

export default CommentItem;