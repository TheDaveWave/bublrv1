import { Box, Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import { useState } from "react";

function SettingsPage() {
    // setup local state
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

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

    return (
        <Box
            component='form'
            sx={{
                '& .MuiTextField-root': { m: 2, width: '25ch' },
                }}
        >
            <Button onClick={() => getLocation()} variant='contained'>Get Location</Button>
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
        </Box>
    );
}

export default SettingsPage;