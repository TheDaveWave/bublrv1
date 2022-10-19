const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET route to retrieve all the comments for a specific fountain.
router.get('/ftn/:ftnId', rejectUnauthenticated, (req, res) => {
  // get the ftnId from the url params.
  const ftnId = req.params.ftnId;
  // console.log(ftnId);
  // setup SQL query text.
  const queryText = `SELECT "u"."username",
  "c".*
  FROM "comments" AS "c"
  JOIN "fountains" AS "f" ON "f"."id" = "c"."fountain_id"
  JOIN "users" AS "u" ON "c"."user_id" = "u"."id"
  WHERE "f"."id"=$1;`;
  pool.query(queryText, [ftnId])
  .then(response => {
    res.send(response.rows);
  })
  .catch(err => {
    console.log(`Error getting all comments for fountain with id: ${ftnId}`, err);
    res.sendStatus(500);
  });
});

// GET route to get all replies
router.get('/reply', rejectUnauthenticated, (req, res) => {
  // setup SQL query text.
  const queryText = `SELECT "u"."username",
  "r".*
  FROM "replies" AS "r" 
  JOIN "users" AS "u" ON "r"."user_id" = "u"."id";`;
  pool.query(queryText)
  .then(response => {
    res.send(response.rows);
  })
  .catch(err => {
    console.log(`Error getting replies`, err);
    res.sendStatus(500);
  });
});

// POST route to add a comment to a fountain.
router.post('/:ftnId', rejectUnauthenticated, (req, res) => {
  // Extract fountain id from req params
  const ftnId = req.params.ftnId;
  // Setup SQL query text.
  const queryText = `INSERT INTO "comments" ("user_id", "fountain_id", "body")
  VALUES ($1, $2, $3);`;
  pool.query(queryText, [req.user.id, ftnId, req.body.body])
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log(`Error in add a comment to fountain w/ id: ${ftnId}`, err);
    res.sendStatus(500);
  });
});

// route to DELETE a comment
router.delete('/:commentId', rejectUnauthenticated, (req, res) => {
  const commentId = req.params.commentId;
  // Setup SQL query text.
  const queryText = `DELETE FROM "comments" WHERE "id"=$1 AND "user_id"=$2;`;
  pool.query(queryText, [commentId, req.user.id])
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log('Error deleting comment', err);
    res.sendStatus(500);
  })
});

// POST route to add a reply to a comment given a comment id.
router.post('/reply/:commentId', rejectUnauthenticated, (req, res) => {
  // Extract comment id from req params.
  const commentId = req.params.commentId;
  // Setup SQL query text.
  const queryText = `INSERT INTO "replies" ("user_id", "comment_id", "body")
  VALUES ($1, $2, $3);`;
  pool.query(queryText, [req.body.user_id, commentId, req.body.body])
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log(`Error replyling to comment with id: ${commentId}`, err);
    res.sendStatus(500);
  });
});

module.exports = router;
