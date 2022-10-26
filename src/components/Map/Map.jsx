import { Button, Container, Rating, FormGroup, FormControlLabel, Checkbox, Box } from "@mui/material";
import { DirectionsRenderer, GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import './Map.css';

// component to display the map page.
function Map() {
    // access history.
    const history = useHistory();
    // setup local state for the map.
    // lat and lng are set to fargo, ND.
    const [lat, setLat] = useState(46.8772);
    const [lng, setLng] = useState(-96.7898);
    const [coords, setCoords] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null);
    const [toggleOptions, setToggleOptions] = useState(false);
    // store the directions response from google into local state.
    const [directionsRes, setDirectionsRes] = useState(null);
    // state to store the distance and duration returned by google directions service.
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    // import fountains data from redux.
    const fountains = useSelector(store => store.fountains.fountainsReducer);
    // fountain state to use either fountains or the filtered fountains.
    const [fountainState, setFountainState] = useState([]);
    let filteredFountains = [];
    // setup local state for filter
    const [filterMode, setFilterMode] = useState(false);
    const [laminar, setLaminar] = useState(false);
    const [turbulent, setTurbulent] = useState(true);
    const [bottle, setBottle] = useState(false);
    const [outdoor, setOutdoor] = useState(true);
    const [indoor, setIndoor] = useState(false);
    // store closest fountain.
    const [closest, setClosest] = useState({});

    // find marker shortest distance from user to marker 
    const findClosest = () => {
        // getLocation();
        let result = 0;
        let fountain;
        fountains.map((ftn, index) => {
            let x = Number(ftn.longitude) - lng;
            let y = Number(ftn.latitude) - lat;
            // console.log('X:', x, 'Y:', y);
            let x2 = x * x;
            let y2 = y * y;
            let root = Math.sqrt(x2 + y2);
            // console.log(ftn.id, ":", root);
            if(index === 0) {
                result = root;
                fountain = ftn;
            }
            if(result > root) {
                result = root;
                fountain = ftn;
            }
        });
        // console.log(result, fountain);
        setClosest({lat: Number(fountain?.latitude), lng: Number(fountain?.longitude)});
    }

    // direct to closest fountain.
    const directToClosest = () => {
        findClosest();
        // console.log('~~~In Direct to Closest~~~', closest);
        getDirections(closest);
    }

    // create filter object.
    const mapFilter = {
        laminar,
        turbulent,
        bottle,
        outdoor,
        indoor
    }

    // filter out the fountains that match the criteria.
    const filterFountains = () => {
        // console.log('In filterFountains');
        // NEED TO MAKE THIS MORE DYNAMIC
        filteredFountains = fountains.filter(ftn => {
            if(ftn.laminar_flow === mapFilter.laminar 
                && ftn.turbulent_flow === mapFilter.turbulent
                && ftn.bottle_accessible === mapFilter.bottle
                && ftn.outdoor === mapFilter.outdoor
                && ftn.indoor === mapFilter.indoor) 
            {
                console.log(ftn);
                return ftn;
            }
        }); 
        // dispatch({
        //     type: 'SET_FOUNTAINS',
        //     payload: filteredFountains
        // });
        // console.log(filteredFountains);
        // filteredFountains = [];
    }

    // used to reset checkboxes state.
    const clearCheckBoxes = () => {
        setLaminar(false);
        setTurbulent(true);
        setBottle(false);
        setOutdoor(true);
        setIndoor(false);
    }

    // used to filter fountains on the map.
    const useFilter = () => {
        setFilterMode(true);
        // run the filter to populate the filter array.
        filterFountains();
        // set the fountain state to filteredFountains.
        setFountainState(filteredFountains);
    }

    // used to clear the filter.
    const clearFilter = () => {
        dispatch({
            type: 'GET_FOUNTAINS'
        });
        clearCheckBoxes();
        setFilterMode(false);
        filteredFountains = [];
    }

    // access useDispatch().
    const dispatch = useDispatch();
    // get the current route.
    let match = useRouteMatch();
    let checkMatch = match.path === '/map';
    // console.log(match);

    // function to get the current location of the user. 
    // const getLocation = () => {
    //     // check if user has location services enabled.
    //     if(navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(p => {
    //             // set lat local state to current latitude.
    //             setLat(p.coords.latitude);
    //             // set lng local state to current longitude.
    //             setLng(p.coords.longitude);
    //             // console log for testing
    //             console.log(p.coords.latitude, p.coords.longitude);
    //         });
    //         setCoords(true);
    //     }
    //     else {
    //         alert('Navigation services are not enabled.');
    //     }
    // }

    // function to get the current location of the user. 
    const getLocation = () => {
        // check if user has location services enabled.
        return new Promise((resolve, reject) => {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(p => {
                    // set lat local state to current latitude.
                    setLat(p.coords.latitude);
                    // set lng local state to current longitude.
                    setLng(p.coords.longitude);
                    // console log for testing
                    console.log(p.coords.latitude, p.coords.longitude);
                    resolve(setCoords(true));
                }, err => {
                    alert('Navigation services are not enabled.');
                });
            }
        })
    }

    // handle the active marker, set activeMarker to the fountain id.
    const handleActiveMarker = (marker) => {
        if(marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    }

    // used to add a like to a fountain.
    const addLike = (ftnId) => {
        dispatch({type: 'ADD_LIKE', payload: ftnId});
    }

    // used to remove a like from a fountain.
    const removeLike = (ftnId) => {
        dispatch({type: 'REMOVE_LIKE', payload: ftnId});
    }

    // get fountains on load.
    useEffect(() => {
        // if(filteredFountains.length === 0) {
        //     dispatch({type: 'GET_FOUNTAINS'});
        // }
        dispatch({type: 'GET_FOUNTAINS'});
        // setFountainState(filteredFountains);
        setCoords(false);
        getLocation();
    }, []);

    useEffect(() => {
        // console.log(history);
        // console.log(history.location);
        if(coords === false) {
            return;
        }
        if(coords) {
            findClosest();
        }
        if(history.location.state !== undefined && coords) {
            getDirections(history.location.state?.position);
            window.history.replaceState({}, document.title);
        }
    }, [coords]);


    // Google Maps

    // set up directions service from google.maps
    const DirectionsService = new google.maps.DirectionsService();
    // create an async function to await a response from the google
    // server which will send the directions.
    async function getDirections(position) {
        try {
             // call get location to get the location of the user
            // this will be the origin location.
            getLocation();
            const results = await DirectionsService.route({
                origin: new google.maps.LatLng(lat, lng),
                destination: new google.maps.LatLng(position.lat, position.lng),
                travelMode: google.maps.TravelMode.DRIVING
            });
            console.log(results);
            // set the directions results to the result from teh request.
            setDirectionsRes(results);
            // set the distance and duration to state variables.
            setDistance(results.routes[0].legs[0].distance.text);
            setDuration(results.routes[0].legs[0].duration.text);
            // close the ingo window
            setActiveMarker(null);
        } catch (err) {
            console.log('Error in getting directions', err);
        }
    }

    // clear the current route.
    const clearRoute = () => {
        if(directionsRes !== null) {
            setDirectionsRes(null);
            setDistance('');
            setDuration('');
            // history.push('/maps');
        }
    }

    // create center object using user's location
    const center = {lat: lat, lng: lng};
    // setup config for the googlmaps options property
    const mapOptions = {
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
    }

    // create restriction bounds.
    // const bounds = {
    //     north: lat + 0.0007,
    //     south: lat - 0.0007,
    //     west: lng - 0.0015,
    //     east: lng + 0.0014,
    // }
    const bounds = {
        north: lat + 0.01,
        south: lat - 0.01,
        west: lng - 0.01,
        east: lng + 0.01,
    }

    // map options when viewing on the homepage.
    const homeMapOptions = {
        // gestureHandling: 'none',
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        restriction: {latLngBounds: bounds }
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
        <Box sx={{mt: 1}} component='div'></Box>
        <Box sx={{width: '100vw'}}>
            <GoogleMap
            // setup properties of the map for it to function.
            zoom={checkMatch ? 15 : 18}
            center={center}
            mapContainerClassName={checkMatch ? 'map-container' : 'mini-map'}
            options={checkMatch ? mapOptions : homeMapOptions}
            // options={mapOptions}
            onClick={() => setActiveMarker(null)}
            >
            {/* If there is a response from the directions service then conditionally render the route,
                otherwise put a marker where the user is */}
            {directionsRes ? 
                <DirectionsRenderer directions={directionsRes}/>
                : <Marker position={center} icon={customUserIcon}></Marker>}
            {/* Attempting to make a filter for the markers and conditionally render it without making api calls.*/}
            {!filterMode ? 
            fountains.map(ftn => (
                <Marker
                    key={ftn.id}
                    position={{lat: Number(ftn?.latitude), lng: Number(ftn.longitude)}}
                    icon={customIcon}
                    onClick={() => handleActiveMarker(ftn.id)}
                >
                    {activeMarker == ftn.id && (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <div>
                                <img className='info-img' src={ftn.picture} alt='A Bubbler'/>
                                <div>
                                <Rating value={Number(ftn.rating)} precision={0.1} readOnly/>
                                </div>
                                <p>Likes: {ftn.likes}</p>
                                <button onClick={() => getDirections({lat: Number(ftn.latitude), lng: Number(ftn.longitude)})}>Go</button>
                                <button onClick={() => addLike(ftn.id)}>Like</button>
                                <button onClick={() => removeLike(ftn.id)}>Dislike</button>
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
             ))
             : 
            //  basially a copy of whats above but mapping over a different array of filtered fountains.
             fountainState.map(ftn => (
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
                                <div>
                                <Rating value={Number(ftn.rating)} precision={0.1} readOnly/>
                                </div>
                                <p>Likes: {ftn.likes}</p>
                                <button onClick={() => getDirections({lat: Number(ftn.latitude), lng: Number(ftn.longitude)})}>Go</button>
                                <button onClick={() => addLike(ftn.id)}>Like</button>
                                <button onClick={() => removeLike(ftn.id)}>Dislike</button>
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
             ))
            }
            </GoogleMap>
        </Box>
        <Box className={checkMatch ? 'map-btns' : 'mini-map-btns'} >
            <Button onClick={() => directToClosest()} variant='contained'>Closest Fountain</Button>
            <Button onClick={() => clearRoute()} variant='contained'>Clear Route</Button>
        </Box>
        {toggleOptions ?   
        <Box
            sx={{
                zIndex: '2', 
                position: 'absolute',
                top: 65,
                left: 0,
            }}
        >
            <Button onClick={() => setToggleOptions(false)} variant='contained'>Close</Button>
            {checkMatch && 
            <Container>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={laminar} onChange={evt => {setLaminar(!laminar); setTurbulent(laminar)}}/>} label='Laminar Flow'/>
                    <FormControlLabel control={<Checkbox checked={turbulent} onChange={evt => {setTurbulent(!turbulent); setLaminar(turbulent)}}/>} label='Turbulent Flow'/>
                    <FormControlLabel control={<Checkbox checked={bottle} onChange={evt => setBottle(!bottle)}/>} label='Bottle Accessible'/>
                    <FormControlLabel control={<Checkbox checked={outdoor} onChange={evt => {setOutdoor(!outdoor); setIndoor(outdoor)}}/>} label='Outdoor'/>
                    <FormControlLabel control={<Checkbox checked={indoor} onChange={evt => {setIndoor(!indoor); setOutdoor(indoor)}}/>} label='Indoor'/>
                </FormGroup>
                <Button onClick={() => useFilter()}>Filter</Button>
                <Button onClick={() => clearFilter()}>Clear Filter</Button>
            </Container>
            }
        </Box> 
        :
        checkMatch && 
        <div>
            <div id='options'>
            <Button onClick={() => setToggleOptions(true)} variant='contained' >Options</Button>
            </div>
        </div> 
        }
        </div>
    );
}

export default Map;