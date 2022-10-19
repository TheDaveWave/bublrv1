
function CommentItem({comment}) {
    return (
        <li>ID: {comment.id} | User: {comment.username} | Comment: {comment.body} | Likes: {comment.likes} | Date: {comment.date}</li>
    );
}

export default CommentItem;