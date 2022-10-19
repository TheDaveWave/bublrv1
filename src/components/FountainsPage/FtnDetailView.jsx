import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function FtnDetailView() {
    // get the current fountain from redux
    const ftn = useSelector(store => store.fountains.fountain[0]);
    console.log(ftn);
    
    // access useDispatch
    const dispatch = useDispatch();
    // access the url parameters to get the fountain id.
    const { ftnId } = useParams();

    // retrieve current fountain on load.
    useEffect(() => {
        dispatch({
            type: 'GET_FOUNTAIN',
            payload: Number(ftnId)
        });
    }, []);

    return (
        <main>
            <h1>Fountain: {ftn.id}</h1>
            <p>Rating: {ftn.rating}</p>
        </main>
    );
}

export default FtnDetailView;