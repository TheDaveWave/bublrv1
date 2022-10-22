import { Box, Button, Divider, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function SettingsPage() {
    const defaultImageUrl = 'images/eda-fountain1.jpeg';
    const dispatch = useDispatch();
    const history = useHistory();
    // setup local state
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [picture, setPicture] = useState(defaultImageUrl);

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

    // instantiate fountain object.
    const fountainObj = {
        lat,
        lng,
        picture
    }

    // used to upload a new fountain.
    const addFountain = () => {
        if(!lat || !lng || !picture) {
            alert('Please fill out form');
        } else {
            dispatch({
                type: 'ADD_FOUNTAIN',
                payload: fountainObj
            });
            history.push('/maps');
        }
    }

    return (
        <Box
            component='form'
            sx={{
                '& .MuiTextField-root': { m: 2, width: '25ch' },
                '.MuiButtonBase-root': {m: 2}
                }}
        >
            <div>
                <TextField 
                    variant='standard'
                    label='Latitude'
                    value={lat}
                />
                <TextField 
                    variant='standard'
                    label='Longitude'
                    value={lng}
                />
            </div>
            <Button onClick={() => getLocation()} variant='contained'>Get Location</Button>
            <Divider variant='middle'/>
            <Box
                component='label'
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '25ch' },
                }}
            >
                <TextField 
                    variant='standard'
                    label='Image URL'
                    type='url'
                    value={picture}
                    onChange={evt => setPicture(evt.target.value)}
                />
            </Box>
            <Divider variant='middle'/>
            <Box
                component='label'
                sx={{
                    '.MuiButtonBase-root': { m: 2, width: '12.5ch'},
                }}
            >
                <Button onClick={() => addFountain()} variant='contained'>Upload</Button>
            </Box>
        </Box>
    );
}

export default SettingsPage;