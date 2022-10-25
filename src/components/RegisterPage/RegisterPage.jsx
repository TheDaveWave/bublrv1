import { Box, Button } from '@mui/material';
import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <Box>
      <RegisterForm />

      <center>
        <Box sx={{ mt: 2 }}>
        <Button
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
        </Box>
      </center>
    </Box>
  );
}

export default RegisterPage;
