import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  // setup local state.
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(user.bio || 'Empty');
  const [firstname, setFirstname] = useState(user.firstname || '');
  const [lastname, setLastname] = useState(user.lastname || '');
  const [password, setPassword] = useState('');

  // setup updated user object to be sent to database.
  const userObj = {
    firstname,
    lastname,
    password
  }

  return (
    <main>
      <div>
        <h2>{user.username}</h2>
        <p>First Name: {user.firstname}</p>
        <p>Last Name: {user.lastname}</p>
        <h3>Bio</h3>
      </div>
      <div>
        <textarea value={bio} onChange={evt => setBio(evt.target.value)} readOnly={editMode ? false : true}></textarea>
        <div>
          {editMode ? 
            <>
            <button>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button> 
            </> :
            <button onClick={() => setEditMode(true)}>Edit</button>
          }         
        </div>
      </div>
      {/* on edit mode create form to update user information */}
      {editMode && 
        <div>
          <label htmlFor='firstname'>First Name</label>
          <input value={firstname} onChange={evt => setFirstname(evt.target.value)} id='firstname' type='text'/>
          <br />
          <label htmlFor='lastname'>Last Name</label>
          <input value={lastname} onChange={evt => setLastname(evt.target.value)} id='lastname' type='text'/>
          <br />
          <label htmlFor='pass'>New Password</label>
          <input value={password} onChange={evt => setPassword(evt.target.value)} id='pass' type='password'/>
        </div>
      }
      <LogOutButton />
    </main>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
