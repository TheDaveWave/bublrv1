import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function ReplyItem({reply}) {

    // setup access to useDispatch()
    const dispatch = useDispatch();
    // get access to current user id.
    const userid = useSelector(store => store.user.id);

    const deleteReply = () => {

    }

    return (
        <>
        <li key={reply?.id}>User: {reply.username} | Reply: {reply.body} | Likes {reply.likes} | Date: {reply.date}</li>
        {userid === Number(reply.user_id) && <button>Delete</button>}
        </>
    );
}

export default ReplyItem;