import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { Box, Divider, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';

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
          <ListItem>
            <ListItemText 
              primary={
                <Typography variant='h6'>
                  Bio
                </Typography>
              }
              secondary={
                <TextField 
                  fullWidth 
                  multiline 
                  rows={5} 
                  value={bio} 
                  onChange={evt => setBio(evt.target.value)} 
                  disabled={editBio ? false : true}
                />
              }
            />
          </ListItem>
        </List>
      </Box>
      <Box>
        {editBio ? 
          <>
          <button onClick={() => updateBio()}>Save</button>
          <button onClick={() => setEditBio(false)}>Cancel</button> 
          </> :
          <button onClick={() => setEditBio(true)}>Edit Bio</button>
        }         
      </Box>
      {/* on edit mode create form to update user information */}
      {editMode ?
      <>
        <Box>
          <label htmlFor='firstname'>First Name</label>
          <input value={firstname} onChange={evt => setFirstname(evt.target.value)} id='firstname' type='text'/>
          <br />
          <label htmlFor='lastname'>Last Name</label>
          <input value={lastname} onChange={evt => setLastname(evt.target.value)} id='lastname' type='text'/>
          <br />
          <label htmlFor='pass'>New Password</label>
          <input value={password} onChange={evt => setPassword(evt.target.value)} id='pass' type='password'/>
        </Box>
        <Box>
          <button onClick={() => updateInfo()}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button> 
        </Box>
      </> :
        <button onClick={() => setEditMode(true)}>Edit Profile</button>
      }
      <LogOutButton />
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
