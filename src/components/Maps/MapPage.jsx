import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Map from "../Map/Map";

// component to display the map page.
function MapPage() {
    // access useDispatch().
    const dispatch = useDispatch();

    // get fountains on load.
    useEffect(() => {
        dispatch({type: 'GET_FOUNTAINS'});
    }, []);


    // extract isLoaded key from useLoadScript
    const { isLoaded } = useLoadScript({
        // access the google maps API key.
        googleMapsApiKey: 'AIzaSyDpIuGzfvVnYjbuWH99wXaEDuCfFuPjwdM',
    });

    return (
        <main>
            {isLoaded ? <Map /> : <div>Loading...</div>}
        </main>
    );
}

export default MapPage;