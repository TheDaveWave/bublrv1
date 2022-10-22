import { Box, Button, Checkbox, Container, Divider, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
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
    const [editMode, setEditMode] = useState(false);
    const [selectLat, setSelectLat] = useState('');
    const [selectLng, setSelectLng] = useState('');
    const [selPicture, setSelPicture] = useState('');
    const [fountainId, setFountainId] = useState('');    
    const [laminar, setLaminar] = useState(false);
    const [turbulent, setTurbulent] = useState(false);
    const [bottle, setBottle] = useState(false);
    const [outdoor, setOutdoor] = useState(false);
    const [indoor, setIndoor] = useState(false);

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
            // console.log(editFtnObj);
            setEditMode(true);
            const fountainObj = sortFountains.find(ftn => ftn.id === fountainId);
            // console.log(fountainObj);
            setSelectLat(Number(fountainObj.latitude));
            setSelectLng(Number(fountainObj.longitude));
            setSelPicture(fountainObj?.picture);
            setLaminar(fountainObj?.laminar_flow);
            setTurbulent(fountainObj?.turbulent_flow);
            setBottle(fountainObj?.bottle_accessible);
            setOutdoor(fountainObj?.outdoor);
            setIndoor(fountainObj?.indoor);
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

    // instantiate edit fountain object.
    const editFtnObj = {
        ftnId: fountainId,
        lat: selectLat,
        lng: selectLng,
        picture: selPicture,
        laminar,
        turbulent,
        bottle,
        outdoor,
        indoor
    }

    // used to send a dispatch to update a fountain.
    const editFountain = () => {
        dispatch({
            type: 'EDIT_FOUNTAIN',
            payload: editFtnObj
        });
        // close edit mode.
        setEditMode(false);
        setLaminar(false);
        setTurbulent(false);
        setBottle(false);
        setOutdoor(false);
        setIndoor(false);
    }


    // get all the fountains on page load.
    useEffect(() => {
        dispatch({type: 'GET_FOUNTAINS'});
    }, []);

    // set fountainId to a value anytime fountainId is updated.
    useEffect(() => {
        setFountainId(fountainId);
        // const fountainObj = sortFountains.find(ftn => ftn.id === fountainId);
        // console.log(fountainObj);
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
            <Container>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={laminar} onChange={evt => {setLaminar(!laminar); setTurbulent(laminar)}}/>} label='Laminar Flow'/>
                    <FormControlLabel control={<Checkbox checked={turbulent} onChange={evt => {setTurbulent(!turbulent); setLaminar(turbulent)}}/>} label='Turbulent Flow'/>
                    <FormControlLabel control={<Checkbox checked={bottle} onChange={evt => setBottle(!bottle)}/>} label='Bottle Accessible'/>
                    <FormControlLabel control={<Checkbox checked={outdoor} onChange={evt => {setOutdoor(!outdoor); setIndoor(outdoor)}}/>} label='Outdoor'/>
                    <FormControlLabel control={<Checkbox checked={indoor} onChange={evt => {setIndoor(!indoor); setOutdoor(indoor)}}/>} label='Indoor'/>
                </FormGroup>
            </Container>
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
                {editMode && 
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
                    <Container>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={laminar} onChange={evt => {setLaminar(!laminar); setTurbulent(laminar)}}/>} label='Laminar Flow'/>
                            <FormControlLabel control={<Checkbox checked={turbulent} onChange={evt => {setTurbulent(!turbulent); setLaminar(turbulent)}}/>} label='Turbulent Flow'/>
                            <FormControlLabel control={<Checkbox checked={bottle} onChange={evt => setBottle(!bottle)}/>} label='Bottle Accessible'/>
                            <FormControlLabel control={<Checkbox checked={outdoor} onChange={evt => {setOutdoor(!outdoor); setIndoor(outdoor)}}/>} label='Outdoor'/>
                            <FormControlLabel control={<Checkbox checked={indoor} onChange={evt => {setIndoor(!indoor); setOutdoor(indoor)}}/>} label='Indoor'/>
                        </FormGroup>
                    </Container>
                    <Button onClick={() => editFountain()}>Update</Button>
                    <Button onClick={() => {setEditMode(false); setFountainId('')}}>Cancel</Button>
                </Box>
                }
            </Box>
        </Box>
    );
}

export default SettingsPage;