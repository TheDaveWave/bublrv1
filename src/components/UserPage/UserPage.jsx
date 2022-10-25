import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { Box, Button, Divider, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  // setup local state.
  const [editMode, setEditMode] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [bio, setBio] = useState(user.bio || 'Empty');
  const [firstname, setFirstname] = useState(user.firstname || '');
  const [lastname, setLastname] = useState(user.lastname || '');
  const [password, setPassword] = useState('');
  // access useDispatch
  const dispatch = useDispatch();

  // setup updated user object to be sent to database.
  const userObj = {
    firstname,
    lastname,
    password,
  }

  // used to send updated info to DB.
  const updateInfo = () => {
      dispatch({
        type: 'EDIT_USER',
        payload: userObj
      });
      // empty inputs.
      setPassword('');
      setEditMode(false);
  }

  const updateBio = () => {
    console.log(bio)
    if(bio === user.bio) {
      return;
    } else {
      dispatch({
        type: 'EDIT_BIO',
        payload: bio
      });
      setEditBio(false);
    }
  }

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{width: '100%'}}>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant='h4'>
                  {user.username}
                </Typography>
              }
              secondary={
                <Typography textAlign='left' color='text.secondary'>
                  {user.firstname} {user.lastname}
                </Typography>
              }
            />
          </ListItem>
          <Divider variant='middle'/>
          <ListItem sx={{mt: 2}}>
            <ListItemText 
              primary={
                <>
                  <Typography variant='h6'>
                    Bio
                  </Typography>
                  <Divider sx={{width: '50%'}} variant='middle'/>
                </>
              }
            />
          </ListItem>
          <ListItem>
             <TextField 
                  fullWidth 
                  multiline 
                  minRows={2}
                  value={bio} 
                  onChange={evt => setBio(evt.target.value)} 
                  disabled={editBio ? false : true}
                  className='bio'
                  variant='standard'
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
          </ListItem>
        </List>
        <Box ml={2}>
          {editBio ? 
            <>
            <Button onClick={() => updateBio()}>Save</Button>
            <Button onClick={() => setEditBio(false)}>Cancel</Button> 
            </> :
            <Button onClick={() => setEditBio(true)}>Edit Bio</Button>
          }         
        </Box>
      </Box>
      <Divider />
      {/* on edit mode create form to update user information */}
      <Box ml={2} mt={4}>
      {editMode ?
      <>
        <Box>
          <Box>
            <TextField
              type="text"
              variant='standard'
              label='First Name'
              value={firstname}
              required
              onChange={(event) => setFirstname(event.target.value)}
            />
          </Box>
          <Box>
            <TextField
              type="text"
              variant='standard'
              label='Last Name'
              value={lastname}
              required
              onChange={(event) => setLastname(event.target.value)}
            />
          </Box>
          <Box>
            <TextField
              type="password"
              variant='standard'
              label='New Password'
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Box>
        </Box>
        <Box>
          <Button onClick={() => updateInfo()}>Save</Button>
          <Button onClick={() => setEditMode(false)}>Cancel</Button> 
        </Box>
      </> :
        <Button variant='contained' onClick={() => setEditMode(true)}>Edit Profile</Button>
      }
      </Box>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
