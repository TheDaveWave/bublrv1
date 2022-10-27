import { Box, Divider, Paper, Typography } from '@mui/material';
import { useLoadScript } from '@react-google-maps/api';
import React from 'react';
import { useSelector } from 'react-redux';
import Map from '../Map/Map';
import './LandingPage.css';

function LandingPage() {
  const user = useSelector(store => store.user);
  // const [heading, setHeading] = useState('Welcome');
  const quotes = [
    '“We forget that the water cycle and the life cycle are one.” — Jacques Yves Cousteau',
    '“Nothing is softer or more flexible than water, yet nothing can resist it.” — Lao Tzu',
    '"Water is the driving force of all nature.” — Leonardo da Vinci',
    '“If there is magic on this planet, it is contained in water.” — Loren Eiseley',
    '"Thousands have lived without love, not one without water." - W. H. Auden',
    `"I'm an instant star. Just add water and stir." - David Bowie`
  ];

  const rdmIndex = Math.floor(Math.random() * quotes.length);
  // console.log(rdmIndex);

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
      <Box sx={{mt: 4, ml: 2, mr: 2}}>
          <Typography>
            {quotes[rdmIndex]}
          </Typography>
      </Box>
    </Box>
  );
}

export default LandingPage;
