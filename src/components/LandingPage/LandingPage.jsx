import { Box, Divider, Paper, Typography } from '@mui/material';
import { useLoadScript } from '@react-google-maps/api';
import React from 'react';
import { useSelector } from 'react-redux';
import Map from '../Map/Map';
import './LandingPage.css';

// used as a landing page and home page.
function LandingPage() {
  // access the user store.
  const user = useSelector(store => store.user);
  // have an array of quotes about water.
  const quotes = [
    '“We forget that the water cycle and the life cycle are one.” — Jacques Yves Cousteau',
    '“Nothing is softer or more flexible than water, yet nothing can resist it.” — Lao Tzu',
    '"Water is the driving force of all nature.” — Leonardo da Vinci',
    '“If there is magic on this planet, it is contained in water.” — Loren Eiseley',
    '"Thousands have lived without love, not one without water." - W. H. Auden',
    `"I'm an instant star. Just add water and stir." - David Bowie`
  ];
  // create a random number using the length of the quotes array
  // to get a random index that will be displayed on the page.
  const rdmIndex = Math.floor(Math.random() * quotes.length);

  // set the heading depending on if the user is logged in or not.
  let heading = '';

  if(user.id) {
    heading = `Getting thirsty, ${user.username}?`;
  } else {
    heading = `Welcome`
  }

  // extract a boolean value used to check if the map is loaded with given 
  // properties.
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDpIuGzfvVnYjbuWH99wXaEDuCfFuPjwdM',
  });

  return (
    <Box sx={{mt: 2}}>
      <Typography align='center' component='h2' variant='h6'>{heading}</Typography>
      <Divider />
      {/* if isLoaded is true display the map, else display Loading... */}
      <Box>
        {isLoaded ? <Map /> : <div>Loading... </div>}
      </Box>
      <Box sx={{mt: 4, ml: 2, mr: 2}}>
          {/* display a random quote from the quotes array. */}
          <Typography variant='h6'>
            {quotes[rdmIndex]}
          </Typography>
      </Box>
    </Box>
  );
}

export default LandingPage;
