
function Replies({replies}) {
    return (
        <ul>
            {replies.map(reply => (
                <li key={reply.id}>Reply: </li>
            ))}
        </ul>
    );
}

export default Replies()