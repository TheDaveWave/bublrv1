import { Avatar, Box, Button, Divider, Input, ListItem, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';

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
        <ListItem key={reply?.id}>
            <ListItemIcon>
                <Avatar />
            </ListItemIcon>
            <ListItemText 
                primary={reply.username}
                secondary={reply.body}
            />
        </ListItem>
        <Divider variant='middle' />
        <Stack direction='row' justifyContent='space-evenly' alignItems='flex-end'>
        {userid === Number(reply.user_id) && 
            <>
            {editMode ? 
            <>
            <Input value={newBody} onChange={evt => setNewBody(evt.target.value)} placeholder='Edit reply...'/>
                <Button size='small' onClick={() => setEditMode(false)}>Cancel</Button>
                <Button size='small' onClick={() => editReply(reply.id)}>Confirm</Button>
            </> : 
            <> 
            <Button size='small' onClick={() => setEditMode(true)}>Edit</Button>
            <Button size='small' startIcon={<DeleteIcon />} onClick={() => deleteReply(reply.id)}>Delete</Button>
            </>}
            </>}
        </Stack>
        </>
    );
}

export default ReplyItem;