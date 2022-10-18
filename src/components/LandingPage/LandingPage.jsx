import { useLoadScript } from '@react-google-maps/api';
import React, { useState } from 'react';
import Map from '../Map/Map';
import './LandingPage.css';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');


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
