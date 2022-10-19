const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to retrieve all the comments for a specific fountain.
router.get('/:ftnId', (req, res) => {
  // get the ftnId from the url params.
  const ftnId = req.params.ftnId;
  // setup SQL query text.
  const queryText = `SELECT "c".*
  FROM "comments" AS "c"
  JOIN "fountains" AS "f" ON "f"."id" = "c"."fountain_id"
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

// GET route to get all replies for a specific comment.
router.get('/reply/:commentId', (req, res) => {
  // extract the comment id from request params.
  const commentId = req.params.commentId;
  // setup SQL query text.
  const queryText = `SELECT "r".*, "c"."fountain_id"
  FROM "comments" AS "c"
  JOIN "replies" AS "r" ON "r"."comment_id"="c"."id"
  WHERE "c"."id"=$1;`;
  pool.query(queryText, [commentId])
  .then(response => {
    res.send(response.rows);
  })
  .catch(err => {
    console.log(`Error getting replies for comment w/ id: ${commentId}`, err);
    res.sendStatus(500);
  });
});

// POST route to add a comment to a fountain.
router.post('/:ftnId', (req, res) => {
  // Extract fountain id from req params
  const ftnId = req.params.ftnId;
  // Setup SQL query text.
  const queryText = `INSERT INTO "comments" ("user_id", "fountain_id", "body")
  VALUES ($1, $2, $3);`;
  pool.query(queryText, [req.body.user_id, ftnId, req.body.body])
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log(`Error in add a comment to fountain w/ id: ${ftnId}`, err);
    res.sendStatus(500);
  });
});

// POST route to add a reply to a comment given a comment id.
router.post('/reply/:commentId', (req, res) => {
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
