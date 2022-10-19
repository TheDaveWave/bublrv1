import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Replies({commentId}) {
    // get access to the replies from redux.
    const replies = useSelector(store => store.fountains.replies);
    console.log(replies);
    // access useDispatch()
    const dispatch = useDispatch();

    // fetch replies on load.
    useEffect(() => {
        dispatch({
            type: 'GET_REPLIES',
            // payload: commentId
        });
    }, []);

    return (
        <>
            {replies.map(reply => (
                <li key={reply?.id}>User: {reply.username} | Reply: {reply.body} | Likes {reply.likes} | Date: {reply.date}</li>
            ))}
        </>
    );
}

export default Replies