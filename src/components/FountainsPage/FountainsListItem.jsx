import { useHistory } from "react-router-dom";

function FountainsListItem({fountain}) {
    // access browser history
    const history = useHistory();

    return (
        <div>
            <img src={fountain.picture} className='info-img' alt='A drinking fountain'/>
            <div>
                <p>Rating: {fountain.rating}</p>
                <p>Likes: {fountain.likes}</p>
            </div>
            <div>
                <button>Go</button>
                <button onClick={() => history.push(`/fountain/${fountain.id}`)}>Comments</button>
                <button>Rate</button>
            </div>
        </div>
    );
}

export default FountainsListItem;