import { Rating } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function FountainsListItem({fountain}) {
    // access browser history
    const history = useHistory();
    const dispatch = useDispatch();
    // setup local state for rating
    const [rateMode, setRateMode] = useState(false);
    const [rating, setRating] = useState(0);

    // used to handle the submit of rating.
    const submitRating = () => {
        console.log(rating);
        // dispatch value of rating to redux.
        dispatch({
            type: 'RATE_FOUNTAIN',
            payload: {
                ftnId: fountain.id,
                rating
            }
        });
        // close edit mode.
        setRateMode(false);
    }

    // handle navigation to /maps with direction to selected fountain.
    const fountainGo = () => {
        // create position object to be sent to redux and/or map component.
        const position = {
            lat: Number(fountain.latitude),
            lng: Number(fountain.longitude),
        }
        console.log(position);
        // push to maps page.
        history.push('/maps', {position});
    }

    return (
        <div>
            <img src={fountain.picture} className='info-img' alt='A drinking fountain'/>
            <div>
                {rateMode ? 
                    <Rating name='rating' value={rating} onChange={(evt, newValue) => setRating(newValue)} precision={0.1} /> : 
                    <Rating name='read-only' value={Number(fountain.rating)} precision={0.1} readOnly/>
                }
                <p>Likes: {fountain.likes}</p>
            </div>
            <div>
                <button onClick={() => fountainGo()}>Go</button>
                <button onClick={() => history.push(`/fountain/${fountain.id}`)}>Comments</button>
                {rateMode ? 
                    <button onClick={() => submitRating()}>Confirm</button> : 
                    <button onClick={() => setRateMode(true)}>Rate</button>
                }
            </div>
        </div>
    );
}

export default FountainsListItem;