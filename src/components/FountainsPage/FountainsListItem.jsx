import { useHistory } from "react-router-dom";

function FountainsListItem({fountain}) {
    // access browser history
    const history = useHistory();

    // handle the reviews button.
    const goToReviews = (id) => {
        
    }

    return (
        <div>
            <img src={fountain.picture} className='info-img' alt='A drinking fountain'/>
            <div>
                <p>Rating: {fountain.rating}</p>
            </div>
            <div>
                <button>Go</button>
                <button onClick={() => history.push(`/fountain/${fountain.id}`)}>Reviews</button>
                <button>Rate</button>
            </div>
        </div>
    );
}

export default FountainsListItem;