import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { AppBar } from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <AppBar position='fixed'>
      <div className="nav">
        <Link to="/home">
          <h2 className="nav-title">Bublr</h2>
        </Link>
        <div>
          {/* If no user is logged in, show these links */}
          {!user.id && (
            // If there's no user, show login/registration links
            <Link className="navLink" to="/login">
              Login / Register
            </Link>
          )}

          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <Link className="navLink" to="/home">
                Home
              </Link>

              <Link className="navLink" to="/user">
                Profile
              </Link>
              
              {/* link to the maps page */}
              <Link className='navLink' to='/maps'>
                Map
              </Link>

              <Link className='navLink' to='/fountains'>
                Fountains
              </Link>

              <Link className="navLink" to="/info">
                Info Page
              </Link>

              {/* If a user is logged in and the user is an admin show settings. */}
              {user.admin && (
                <Link className='navLink' to='/admin'>
                  Admin
                </Link>
              )}

              <LogOutButton className="navLink" />
            </>
          )}
          

          <Link className="navLink" to="/about">
            About
          </Link>
        </div>
      </div>
    </AppBar>
  );
}

export default Nav;
