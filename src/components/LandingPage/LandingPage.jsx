import React, { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');

  return (
    <div>
      <h2>{heading}</h2>

      
    </div>
  );
}

export default LandingPage;
