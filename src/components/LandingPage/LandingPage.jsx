import { useLoadScript } from '@react-google-maps/api';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Map from '../Map/Map';
import './LandingPage.css';

function LandingPage() {
  const user = useSelector(store => store.user);
  // const [heading, setHeading] = useState('Welcome');
  let heading = '';

  if(user.id) {
    heading = `Welcome Back, ${user.username}`;
  } else {
    heading = `Welcome`
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDpIuGzfvVnYjbuWH99wXaEDuCfFuPjwdM',
  });

  return (
    <div>
      <h2>{heading}</h2>
      <div>
        {isLoaded ? <Map /> : <div>Loading... </div>}
      </div>
    </div>
  );
}

export default LandingPage;
