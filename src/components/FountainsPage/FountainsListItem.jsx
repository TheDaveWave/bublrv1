import { Rating } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function FountainsListItem({fountain}) {
    // access browser history
    const history = useHistory();
    // setup local state for rating
    const [rateMode, setRateMode] = useState(false);
    const [rating, setRating] = useState(0);

    // used to handle the submit of rating.
    const submitRating = () => {

    }

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
                {!rateMode && <button onClick={() => setRateMode(true)}>Rate</button>}
            </div>
        </div>
    );
}

export default FountainsListItem;