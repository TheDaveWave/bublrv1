import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';

function Nav() {
  const user = useSelector((store) => store.user);
  // setup local state
  const [navAnchor, setNavAnchor] = useState(null);

  return (
    <AppBar position='fixed'>
      <Toolbar className='toolbar'>
          <Link className='navLink' to="/home">
            <h2 className="nav-title">Bublr</h2>
          </Link>
          {/* If no user is logged in, show these links */}
          {!user.id && (
          <Box>
            <IconButton onClick={evt => setNavAnchor(evt.currentTarget)}>
              {/* <MoreVertIcon sx={{color: '#fff'}}/> */}
              {navAnchor? <MenuOpenIcon className='open-icon' sx={{color: '#fff'}}/> : <MenuIcon sx={{color: '#fff'}}/>}
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={navAnchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(navAnchor)}
              onClose={() => setNavAnchor(null)}
              sx={{
                // display: {xs: 'block', md: 'none'},
                display: 'block',
                '.MuiTypography-root': {color: '#000', textAlign: 'center'}
              }}
            >
              <MenuItem>
                <Link className="navLink" to="/login">
                  <Typography>
                    Login
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className='navLink' to='/registration'>
                  <Typography>
                    Register
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="navLink" to="/about">
                  <Typography>
                    About
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          )}
          {user.id && (
          <Box>
            <IconButton onClick={evt => setNavAnchor(evt.currentTarget)}>
              {/* <MoreVertIcon sx={{color: '#fff'}}/> */}
              {navAnchor? <MenuOpenIcon className='open-icon' sx={{color: '#fff'}}/> : <MenuIcon sx={{color: '#fff'}}/>}              
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={navAnchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(navAnchor)}
              onClose={() => setNavAnchor(null)}
              sx={{
                // display: {xs: 'block', md: 'none'},
                display: 'block',
                '.MuiTypography-root': {color: '#000', textAlign: 'center'}
              }}
            >
                {/* If a user is logged in, show these links */}
                {/* {user.id && ( */}
                <MenuItem onClick={() => setNavAnchor(null)}>
                  <Link className="navLink" to="/home">
                    <Typography>
                      Home
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setNavAnchor(null)}>
                  <Link className="navLink" to="/user">
                    <Typography>
                      Profile
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setNavAnchor(null)}>
                  {/* link to the maps page */}
                  <Link className='navLink' to='/maps'>
                    <Typography>
                      Map
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setNavAnchor(null)}>
                  <Link className='navLink' to='/fountains'>
                    <Typography>
                      Fountains
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setNavAnchor(null)}>
                  <Link className="navLink" to="/info">
                    <Typography>
                      Info Page
                    </Typography>
                  </Link>
                </MenuItem>
                    {/* If a user is logged in and the user is an admin show settings. */}
                    {user.admin && (
                      <MenuItem onClick={() => setNavAnchor(null)}>
                        <Link className='navLink' to='/admin'>
                          <Typography>
                            Admin
                          </Typography>
                        </Link>
                      </MenuItem>
                    )}
                <MenuItem onClick={() => setNavAnchor(null)}>
                  <LogOutButton className="navLogout" />
                </MenuItem>
                {/* )} */}
            </Menu>
          </Box>
          )}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
