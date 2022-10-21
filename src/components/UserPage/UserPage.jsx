import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  // setup local state.
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(user.bio || 'Empty');


  return (
    <main>
      <div>
        <h2>{user.username}</h2>
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
      <LogOutButton />
    </main>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
