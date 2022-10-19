import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentItem from "../CommentItem/CommentItem";
import Replies from "../Replies/Replies";

function FtnDetailView() {
    // get the current fountain from redux
    const ftn = useSelector(store => store.fountains.fountain[0]);
    const comments = useSelector(store => store.fountains.fountainComments);
    // console.log(ftn);
    console.log(comments);
    
    // access useDispatch
    const dispatch = useDispatch();
    // access the url parameters to get the fountain id.
    const { ftnId } = useParams();

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
    }, []);

    return (
        <main>
            <h1>Fountain: {ftn?.id}</h1>
            <p>Rating: {ftn?.rating}</p>
            <div>
            <ul>
                {comments.map(comment => (
                    <div key={comment.id}>
                        <CommentItem key={comment.id} comment={comment}/>
                    </div>
                ))}
            </ul>
            <ul>
            </ul>
            </div>
        </main>
    );
}

export default FtnDetailView;