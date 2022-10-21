const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "users" ("username", "email", "password")
    VALUES ($1, $2, $3) RETURNING id;`;
  pool
    .query(queryText, [username, email, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles when a user wants to update their profile.
router.put('/edit', rejectUnauthenticated, (req, res) => {
  // get info from the request body.
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  if(!req.body.password || req.body.password === '') {
    // console.log(req.body);
    const queryText = `UPDATE "users" SET "firstname"=$1, "lastname"=$2
    WHERE "id"=$3 RETURNING*;`;
    pool.query(queryText, [firstname, lastname, req.user.id])
    .then((resp) => {
      // console.log(resp.rows[0]);
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error updating user info', err);
      res.sendStatus(500);
    });
  } else {
    const password = encryptLib.encryptPassword(req.body.password);
    const queryText = `UPDATE "users" SET "firstname"=$1, "lastname"=$2, "password"=$3
    WHERE "id"=$4;`;
    pool.query(queryText, [firstname, lastname, password, req.user.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error updating user info', err);
      res.sendStatus(500);
    });
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});


module.exports = router;
