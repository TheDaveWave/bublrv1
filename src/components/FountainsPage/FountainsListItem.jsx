import { Rating } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function FountainsListItem({fountain}) {
    // access browser history
    const history = useHistory();
    // setup local state for rating
    const [rating, setRating] = useState(Number(fountain.rating));
    console.log(fountain.id, rating);

    return (
        <div>
            <img src={fountain.picture} className='info-img' alt='A drinking fountain'/>
            <div>
                {/* <p>Rating: {fountain.rating}</p> */}
                <Rating name='read-only' value={Number(fountain.rating)} precision={0.1} readOnly/>
                <p>Likes: {fountain.likes}</p>
            </div>
            <div>
                <button>Go</button>
                <button onClick={() => history.push(`/fountain/${fountain.id}`)}>Comments</button>
                {/* <button>Rate</button> */}
            </div>
        </div>
    );
}

export default FountainsListItem;