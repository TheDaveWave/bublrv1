import { useDispatch } from "react-redux";

function CommentItem({comment, ftnId}) {
    // access useDispatch()
    const dispatch = useDispatch();

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
        <button onClick={() => handleDelete()}>Delete</button>
        </>
    );
}

export default CommentItem;