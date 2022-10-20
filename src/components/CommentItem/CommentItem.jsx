import { useDispatch, useSelector } from "react-redux";

function CommentItem({comment, ftnId}) {
    // access useDispatch()
    const dispatch = useDispatch();
    // get current user
    const userid = useSelector(store => store.user.id);
    // console.log(userid);

    const handleDelete = () => {
        dispatch({
            type: 'DELETE_COMMENT',
            payload: {
                commentId: comment.id,
                ftnId
            }
        });
    }

    return (
        <>
        <li>ID: {comment.id} | User: {comment.username} | Comment: {comment.body} | Likes: {comment.likes} | Date: {comment.date}</li>
        <button>Reply</button>
        {Number(comment.user_id) === userid && <button onClick={() => handleDelete()}>Delete</button>}
        </>
    );
}

export default CommentItem;