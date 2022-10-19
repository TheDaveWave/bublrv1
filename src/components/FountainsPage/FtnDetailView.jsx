import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function FtnDetailView() {
    // get the current fountain from redux
    const ftn = useSelector(store => store.fountains.fountain[0]);
    const comments = useSelector(store => store.fountains.fountainComments);
    const replies = useSelector(store => store.fountains.commentReplies);
    // console.log(ftn);
    
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
        // dispatch({
        //     type: 'GET_REPLIES',
        //     payload: 
        // })
    }, []);

    return (
        <main>
            <h1>Fountain: {ftn?.id}</h1>
            <p>Rating: {ftn?.rating}</p>
            <ul>
                {comments.map(comment => (
                    <div key={comment.id}>
                        <li>User: {comment.username} | Comment: {comment.body} | Likes: {comment.likes} | Date: {comment.date}</li>
                        
                    </div>
                ))}
            </ul>
        </main>
    );
}

export default FtnDetailView;