import { Box, Divider, Typography } from '@mui/material';
import { useLoadScript } from '@react-google-maps/api';
import React from 'react';
import { useSelector } from 'react-redux';
import Map from '../Map/Map';
import './LandingPage.css';

function LandingPage() {
  const user = useSelector(store => store.user);
  // const [heading, setHeading] = useState('Welcome');
  let heading = '';

  if(user.id) {
    heading = `Getting thirsty, ${user.username}?`;
  } else {
    heading = `Welcome`
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDpIuGzfvVnYjbuWH99wXaEDuCfFuPjwdM',
  });

  return (
    <Box sx={{mt: 2}}>
      <Typography align='center' component='h2' variant='h6'>{heading}</Typography>
      <Divider />
      <Box>
        {isLoaded ? <Map /> : <div>Loading... </div>}
      </Box>
    </Box>
  );
}

export default LandingPage;
