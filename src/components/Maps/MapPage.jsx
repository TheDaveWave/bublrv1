import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import './MapPage.css';

// component to display the map page.
function MapPage() {
    // access useDispatch().
    const dispatch = useDispatch();


    
    // get fountains on load.
    useEffect(() => {
        dispatch({type: 'GET_FOUNTAINS'});
    }, []);

    // Google Maps
    
    // extract isLoaded key from useLoadScript
    const { isLoaded } = useLoadScript({
        // access the google maps API key.
        googleMapsApiKey: 'AIzaSyDpIuGzfvVnYjbuWH99wXaEDuCfFuPjwdM',
    });


    // if the map is not yet loaded return a loading div.
    if(!isLoaded) {
        return <div>Loading... </div>
    }

    return (
        <main>
            <GoogleMap
            // setup properties of the map for it to function.
            zoom={13}
            mapContainerClassName='map-container'
            >

            </GoogleMap>
        </main>
    );
}

export default MapPage;