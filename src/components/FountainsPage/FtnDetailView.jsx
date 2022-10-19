import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentItem from "../CommentItem/CommentItem";
import Replies from "../Replies/Replies";

function FtnDetailView() {
    // setup local state
    const [newComment, setNewComment] = useState(false);
    const [commentBody, setCommentBody] = useState('');
    // get the current fountain from redux
    const ftn = useSelector(store => store.fountains.fountain[0]);
    const comments = useSelector(store => store.fountains.fountainComments);

    // access useDispatch
    const dispatch = useDispatch();
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
        dispatch({
            type: 'GET_REPLIES',
        });
    }, []);

    return (
        <main>
            <h1>Fountain: {ftn?.id}</h1>
            <p>Rating: {ftn?.rating}</p>
            {newComment ? 
            <div>
                <input value={commentBody} onChange={evt => setCommentBody(evt.target.value)} placeholder='comment'/>
                <button onClick={() => addComment()}>Add</button>
                <button onClick={() => {setNewComment(false); setCommentBody('')}}>Cancel</button>
            </div>
            : <button onClick={() => setNewComment(true)}>Comment</button> }
            <div>
            <ul>
                {comments.map(comment => (
                    <div key={comment.id}>
                        <CommentItem key={comment.id} comment={comment} ftnId={Number(ftnId)}/>
                        <ul>
                            <Replies commentId={comment.id}/>
                        </ul>
                    </div>
                ))}
            </ul>
            </div>
        </main>
    );
}

export default FtnDetailView;