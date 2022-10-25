import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Box, Button } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <Box>
      <LoginForm />

      <center>
        <Box sx={{ mt: 2 }}>
          <Button
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </Button>
        </Box>
      </center>
    </Box>
  );
}

export default LoginPage;
