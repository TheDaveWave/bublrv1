import { Avatar, Button, Chip, Divider, Input, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Stack } from "@mui/system";
import Replies from "../Replies/Replies";

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
    const replies = useSelector(store => store.fountains.replies);
    const commentReplies = [];
    replies.map(reply => {
        if(Number(reply.comment_id) === comment.id) {
            return commentReplies.push(reply);
        }
    });
    // let date = comment.date;
    // date = date.substring(date.indexOf('T')+1, date.indexOf('.'));
    // date = date.substring(0, 5);
    // console.log(date);

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

     // fetch replies on load.
     useEffect(() => {
        dispatch({
            type: 'GET_REPLIES',
        });
    }, []);

    return (
        <>
        <ListItem>
            <ListItemIcon>
                <Avatar />
            </ListItemIcon>
            <ListItemText 
                primary={comment.username}
                secondary={comment.body}
            />
        </ListItem>
        <Divider variant='middle' />
        {/* Conditionally render reply and delete buttons if addingReply is false or reply form if addingReply is true */}
        <Stack direction='row' justifyContent='space-evenly' alignItems='center'>
        {addingReply ? 
        <>
            <Input sx={{ml: 2}} value={newBody} onChange={evt => setNewBody(evt.target.value)} placeholder='Add a reply...'/>
            <Button onClick={() => {setAddingReply(false); setEditMode(false)}}>Cancel</Button>
            <Button onClick={() => handleComment()}>Add</Button>
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
        {commentReplies.length > 0 && 
        <Chip 
            sx={{mt: 1, ml: 2}}
            size='small'
            variant='filled'
            color='primary'
            onClick={() => setOpen(!open)} 
            icon={open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />} 
            label='replies'
        />
        }
        {open && 
        <ul>
            <Replies commentId={comment.id}/>
        </ul>
        }
        </>
    );
}

export default CommentItem;