import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './MapPage.css';

// component to display the map page.
function MapPage() {
    // setup local state for the map.
    // lat and lng are set to fargo, ND.
    const [lng, setLng] = useState(46.8772);
    const [lat, setLat] = useState(-96.7898);

    
    // access useDispatch().
    const dispatch = useDispatch();

    // function to get the current location of the user. 
    const getLocation = () => {
        // check if user has location services enabled.
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(p => {
                // set lat local state to current latitude.
                setLat(p.coords.latitude);
                // set lng local state to current longitude.
                setLng(p.coords.longitude);
                // console log for testing
                console.log(p.coords.latitude, p.coords.longitude);
            });
        }
        else {
            alert('Navigation services are not enabled.');
        }
    }

    // get fountains on load.
    useEffect(() => {
        dispatch({type: 'GET_FOUNTAINS'});
        getLocation();
    }, []);


    // Google Maps

    // create center object using user's location
    const center = {lat: lat, lng: lng};

    
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
            center={center}
            mapContainerClassName='map-container'
            >
                
            </GoogleMap>
        </main>
    );
}

export default MapPage;