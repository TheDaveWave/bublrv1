import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function ReplyItem({reply}) {
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

    return (
        <>
        <li key={reply?.id}>User: {reply.username} | Reply: {reply.body} | Likes {reply.likes} | Date: {reply.date}</li>
        {userid === Number(reply.user_id) && <button onClick={() => deleteReply(reply.id)}>Delete</button>}
        </>
    );
}

export default ReplyItem;