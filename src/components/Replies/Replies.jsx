import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReplyItem from "./RepyItem";

function Replies({commentId}) {
    // get access to the replies from redux.
    const replies = useSelector(store => store.fountains.replies);
    const commentReplies = [];
    replies.map(reply => {
        if(Number(reply.comment_id) === commentId) {
            return commentReplies.push(reply);
        }
    });
    // access useDispatch()
    const dispatch = useDispatch();

    // fetch replies on load.
    useEffect(() => {
        dispatch({
            type: 'GET_REPLIES',
        });
    }, []);

    return (
        <>
            {commentReplies.map(reply => (
                <ReplyItem key={reply?.id} reply={reply}/>
            ))}
        </>
    );
}

export default Replies