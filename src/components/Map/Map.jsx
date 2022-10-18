import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Map.css';

// component to display the map page.
function Map() {
    // setup local state for the map.
    // lat and lng are set to fargo, ND.
    const [lng, setLng] = useState(46.8772);
    const [lat, setLat] = useState(-96.7898);
    const [activeMarker, setActiveMarker] = useState(null);
    // store the directions response from google into local state.
    const [directionsRes, setDirectionsRes] = useState(null);
    // state to store the distance and duration returned by google directions service.
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    // import fountain data from redux.
    const fountains = useSelector(store => store.fountainReducer);

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

    // handle the active marker, set activeMarker to the fountain id.
    const handleActiveMarker = (marker) => {
        if(marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    }

    // get fountains on load.
    useEffect(() => {
        dispatch({type: 'GET_FOUNTAINS'});
        getLocation();
    }, []);


    // Google Maps

    // create center object using user's location
    const center = {lat: lat, lng: lng};
    // setup config for the googlmaps options property
    const mapOptions = {
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
    }

    // create settings for the google marker icon property
    const customUserIcon = {
        url: '/svg/user_marker_red.svg',
        scaledSize: new window.google.maps.Size(40, 40),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(20, 20)
    }

    // the config for the marker icon property.
    const customIcon = {
        url: '/svg/df.svg',
        scaledSize: new window.google.maps.Size(30, 30),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(15, 15)
    }

    return (
        <div>
            <GoogleMap
            // setup properties of the map for it to function.
            zoom={15}
            center={center}
            mapContainerClassName='map-container'
            options={mapOptions}
            onClick={() => setActiveMarker(null)}
            >
            <Marker position={center} icon={customUserIcon}></Marker>
            {fountains.map(ftn => (
                <Marker
                    key={ftn.id}
                    position={{lat: Number(ftn.latitude), lng: Number(ftn.longitude)}}
                    icon={customIcon}
                    onClick={() => handleActiveMarker(ftn.id)}
                >
                    {activeMarker == ftn.id && (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <div>
                                <img className='info-img' src={ftn.picture} alt='A Bubbler'/>
                                <button>Go</button>
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
             ))}
            </GoogleMap>
        </div>
    );
}

export default Map;