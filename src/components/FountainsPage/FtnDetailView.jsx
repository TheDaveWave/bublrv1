import { BottomNavigation, BottomNavigationAction, Box, Button, Card, CardContent, CardMedia, Chip, Input, List, Paper, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import RecommendIcon from '@mui/icons-material/Recommend';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './FountainsPage.css';
import CommentItem from "../CommentItem/CommentItem";
import { Stack } from "@mui/system";

function FtnDetailView() {
    // setup local state
    const [newComment, setNewComment] = useState(false);
    const [commentBody, setCommentBody] = useState('');
    // get the current fountain from redux
    const ftn = useSelector(store => store.fountains.fountain[0]);
    const comments = useSelector(store => store.fountains.fountainComments);

    // access useDispatch
    const dispatch = useDispatch();
    const history = useHistory();
    // access the url parameters to get the fountain id.
    const { ftnId } = useParams();

    // handle add comment button
    const addComment = () => {
        // send a new comment to the database.
        if(!commentBody) {
            alert('Please add comment');
        } else {
            dispatch({
                type: 'ADD_COMMENT',
                payload: {
                    ftnId,
                    body: commentBody,
                }
            });
            // clear input
            setCommentBody('');
            // close add comment form
            setNewComment(false);
        }
    }

    // retrieve current fountain on load.
    useEffect(() => {
        dispatch({
            type: 'GET_FOUNTAIN',
            payload: Number(ftnId)
        });
        dispatch({
            type: 'GET_COMMENTS',
            payload: Number(ftnId)
        });
        // dispatch({
        //     type: 'GET_REPLIES',
        // });
    }, []);

    return (
        <Box 
        component='main' 
        sx={{
            mt: 2
        }}
        >
            <Card>
                <CardMedia 
                    component='img'
                    image={ftn?.picture}
                    alt='A Drinking Fountain'
                />
                <CardContent sx={{mt: -2}}>
                    <Typography variant='caption'>fountain #{ftn?.id}</Typography>
                    <Stack direction='row' spacing={2} justifyContent='space-between'>
                        <Chip icon={<RecommendIcon />} color='primary' variant='outlined' label={ftn?.likes}/>
                        <Rating name='read-only' value={Number(ftn?.rating)} precision={0.1} readOnly/>
                    </Stack>
                </CardContent>
                <CardContent sx={{mt: -3}}>
                <Box>
                    <Input 
                        fullWidth
                        value={commentBody} 
                        onFocus={() => setNewComment(true)} 
                        onChange={evt => setCommentBody(evt.target.value)} 
                        placeholder='Leave a comment'
                    />
                </Box>
                {newComment &&
                <Box component='div'>
                    <Stack direction='row' alignItems='center' justifyContent='flex-end'>
                    <Button onClick={() => {setNewComment(false); setCommentBody('')}}>Cancel</Button>
                    <Button onClick={() => addComment()}>Comment</Button>
                    </Stack>
                </Box>
                }
                <Box sx={{mt: 2}}>
                    <List>
                        {comments.map(comment => (
                            <div key={comment.id}>
                                <CommentItem key={comment.id} comment={comment} ftnId={Number(ftnId)}/>
                            </div>
                        ))}
                    </List>
                </Box>
                </CardContent>
            </Card>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction onClick={() => history.push('/fountains')} label='Back' icon={<ArrowBackIosIcon />}/>
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

export default FtnDetailView;