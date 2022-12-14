import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import MapPage from '../MapsPage/MapPage';

import './App.css';
import FountainsPage from '../FountainsPage/FountainsPage';
import FtnDetailView from '../FountainsPage/FtnDetailView';
import SettingsPage from '../AdminPage/AdminPage';
import { Box } from '@mui/material';

function App() {
  // access useDispatch()
  const dispatch = useDispatch();
  // get the user store from redux.
  const user = useSelector(store => store.user);
  // dispatch to FETCH_USER on application load, and each dispatch.
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
        <Box 
          className='flex-wrapper'
          component='div' 
        >
          <Nav />
          <Box className='content' component='div'>
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />

              {/* Visiting localhost:3000/about will show the about page. */}
              <Route
                // shows AboutPage at all times (logged in or not)
                exact
                path="/about"
              >
                <AboutPage />
              </Route>

              {/* For protected routes, the view could show one of several things on the same route.
                Visiting localhost:3000/user will show the UserPage if the user is logged in.
                If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
                Even though it seems like they are different pages, the user is always on localhost:3000/user */}
              <ProtectedRoute
                // logged in shows UserPage else shows LoginPage
                exact
                path="/profile"
              >
                <UserPage />
              </ProtectedRoute>

              <ProtectedRoute
                // logged in can visit the maps page.
                exact path='/map'
              >
                <MapPage />
              </ProtectedRoute>

              <ProtectedRoute
                exact path='/fountains'
              >
                <FountainsPage />
              </ProtectedRoute>

              <ProtectedRoute
                path='/fountain/:ftnId'
              >
                <FtnDetailView />
              </ProtectedRoute>

              <ProtectedRoute
                // logged in shows InfoPage else shows LoginPage
                exact
                path="/info"
              >
                <InfoPage />
              </ProtectedRoute>
                {/* created admin route */}
              <ProtectedRoute
                exact path='/admin'
              >
                {/* if the user is an admin go to the admin page else redirect to home. */}
                {user.admin ? 
                  <SettingsPage />
                  :
                  <Redirect to="/home" />
                }
              </ProtectedRoute>

              <Route
                exact
                path="/login"
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect to the /home page
                  <Redirect to="/home" />
                  :
                  // Otherwise, show the login page
                  <LoginPage />
                }
              </Route>

              <Route
                exact
                path="/registration"
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect them to the /user page
                  <Redirect to="/home" />
                  :
                  // Otherwise, show the registration page
                  <RegisterPage />
                }
              </Route>

              <Route
                exact
                path="/home"
              >
                {/* {user.id ?
                  // If the user is already logged in, 
                  // redirect them to the /user page
                  <Redirect to="/user" />
                  :
                  // Otherwise, show the Landing page
                  <LandingPage />
                } */}
                <LandingPage />
              </Route>

              {/* If none of the other routes matched, we will show a 404. */}
              <Route>
                <h1>404</h1>
              </Route>
            </Switch>
          </Box>
          <Box
            sx={{
              position: 'sticky',
              bottom: '0',
            }}
          >
            <Footer />
          </Box>
        </Box>
    </Router>
  );
}

export default App;
