import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  // setup local state to capture input values.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        email: email,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Box
      sx={{
        mt: 2,
        '.MuiTextField-root': { m: 0.5, width: '25ch'}
      }}
    >
      <Card>
        <CardContent>
          <form className="formPanel" onSubmit={registerUser}>
            <Typography align='center' component='h2' variant='h5'>Sign Up</Typography>
            {errors.registrationMessage && (
              <h3 className="alert" role="alert">
                {errors.registrationMessage}
              </h3>
            )}
            <Box>
                <TextField
                  type="text"
                  variant='standard'
                  label='Username'
                  value={username}
                  required
                  onChange={(event) => setUsername(event.target.value)}
                />
            </Box>
            <Box>
                <TextField
                  type="email"
                  variant='standard'
                  label='Email'
                  value={email}
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
            </Box>
            <Box>
                <TextField
                  type="password"
                  variant='standard'
                  label='Password'
                  value={password}
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
            </Box>
            <Box textAlign='center' sx={{ mt: 2 }}>
              <Button variant='contained' type='submit'>Register</Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegisterForm;
