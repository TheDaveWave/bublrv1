import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Box 
      sx={{
        mt: 2,
        '.MuiTextField-root': { m: 1, width: '25ch'}
      }}
    >
      <Card>
        <CardContent>
          <form className="formPanel" onSubmit={login}>
            <Typography align='center' component='h2' variant='h5'>Login</Typography>
            {errors.loginMessage && (
              <h3 className="alert" role="alert">
                {errors.loginMessage}
              </h3>
            )}
            <Box>
              {/* <label htmlFor="username">
                Username: */}
                <TextField
                  type="text"
                  variant='standard'
                  label='Username'
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              {/* </label> */}
            </Box>
            <Box>
              {/* <label htmlFor="password">
                Password: */}
                <TextField
                  type="password"
                  variant='standard'
                  label='Password'
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              {/* </label> */}
            </Box>
            <Box textAlign='center' sx={{ mt: 2 }}>
              <Button variant='contained' type='submit'>Log In</Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginForm;
