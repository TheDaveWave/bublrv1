import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function SettingsPage() {
    // get list of fountains from redux.
    const fountains = useSelector(store => store.fountains.fountainsReducer);
    // Sort the fountains by ID without having to make another server get request.
    const sortFountains = [...fountains].sort((a, b) => a.id - b.id);
    // setup access to react methods.
    const defaultImageUrl = 'images/eda-fountain1.jpeg';
    const dispatch = useDispatch();
    const history = useHistory();
    // setup local state
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [picture, setPicture] = useState(defaultImageUrl);
    // setup local state for the edit mode.
    const [selectLat, setSelectLat] = useState('');
    const [selectLng, setSelectLng] = useState('');
    const [selPicture, setSelPicture] = useState('');
    const [fountainId, setFountainId] = useState('');

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

    const selectChange = () => {
        if(!fountainId || fountainId === 0) {
            alert('Please select a fountain to edit');
        } else {
            const fountainObj = sortFountains.find(ftn => ftn.id === fountainId);
            // console.log(fountainObj);
            setSelectLat(Number(fountainObj.latitude));
            setSelectLng(Number(fountainObj.longitude));
            setSelPicture(fountainObj?.picture);
        }
    }

    // instantiate fountain object.
    const fountainObj = {
        lat,
        lng,
        picture
    }

    // instantiate edit fountain object.
    const editFtnObj = {
        ftnId: fountainId,
        lat: selectLat,
        lng: selectLng,
        picture: selPicture,
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

    // get all the fountains on page load.
    useEffect(() => {
        dispatch({type: 'GET_FOUNTAINS'});
    }, []);

    // set fountainId to a value on load.
    useEffect(() => {
        setFountainId(fountainId);
    }, [fountainId]);

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
            <Divider variant='middle' />
            <Box
                sx={{
                    '& .MuiTypography-root': { m: 2 },
                    '.MuiTextField-root': { m: 2, width: '25ch' },
                }}
            >
                <Typography variant='subtitle2'>
                    Edit Fountain
                </Typography>
                <FormControl sx={{width: 150}}>
                    <InputLabel id='ftn-id' sx={{ marginLeft: 2 }}>Fountain ID</InputLabel>
                    <Select 
                        labelId='ftn-id' 
                        sx={{ marginLeft: 2 }}
                        label={`Fountain ID: ${sortFountains[0]?.id}`}
                        value={fountainId}
                        onChange={evt => setFountainId(Number(evt.target.value))}
                    >
                        {sortFountains.map(ftn => (
                            <MenuItem key={ftn.id} value={ftn.id}>Fountain: {ftn.id}</MenuItem>
                        ))}
                    </Select>
                    <Button onClick={() => selectChange()}>Select</Button>
                </FormControl>
                <Box>
                    <div>
                        <TextField 
                            variant='standard'
                            label='Latitude'
                            value={selectLat}
                            onChange={evt => setSelectLat(evt.target.value)}
                        />
                        <TextField 
                            variant='standard'
                            label='Longitude'
                            value={selectLng}
                            onChange={evt => setSelectLng(evt.target.value)}
                        />
                    </div>
                    <TextField 
                        variant='standard'
                        label='Image URL'
                        type='url'
                        value={selPicture}
                        onChange={evt => setPicture(evt.target.value)}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default SettingsPage;