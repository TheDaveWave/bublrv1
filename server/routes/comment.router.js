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
  WHERE "f"."id"=$1
  ORDER BY "date" DESC;`;
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
  JOIN "users" AS "u" ON "r"."user_id" = "u"."id"
  ORDER BY "date" DESC;`;
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
  // set up query text to get comments.user_id
  const getQuery = `SELECT "user_id" FROM "comments" WHERE "id"=$1;`;
  pool.query(getQuery, [commentId])
  .then(response => {
    // get the user id tied to that comment with given id.
    const itemUserId = Number(response.rows[0].user_id);
    // check if the itemUserId matches the logged in user id.
    if(itemUserId === req.user.id) {
      // Setup SQL query text.
      // this query text gets rid of the need to have two queries.
      const queryText = `DELETE FROM "comments" WHERE "id"=$1 AND "user_id"=$2;`;
      pool.query(queryText, [commentId, req.user.id])
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        // maybe add anothe pool to update comment to "delete comment" depending on the error.
        console.log('Error deleting comment', err);
        res.sendStatus(500);
      });
    } else {
      res.sendStatus(401);
    }
  })
  .catch(err => {
    console.log('Error getting user id tied to comment', err);
    res.sendStatus(500);
  });
});

// POST route to add a reply to a comment given a comment id.
router.post('/reply/:commentId', rejectUnauthenticated, (req, res) => {
  // Extract comment id from req params.
  const commentId = req.params.commentId;
  // Setup SQL query text.
  const queryText = `INSERT INTO "replies" ("user_id", "comment_id", "body")
  VALUES ($1, $2, $3);`;
  pool.query(queryText, [req.user.id, commentId, req.body.body])
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log(`Error replyling to comment with id: ${commentId}`, err);
    res.sendStatus(500);
  });
});

// route to delete a reply on a comment.
// current user id must match user_id value of replies table.
router.delete('/reply/:replyId', rejectUnauthenticated, (req, res) => {
  // extract replyId from request parameters.
  const replyId = req.params.replyId;
  // setup SQL query text to get replies.user_id.
  const getQuery = `SELECT "user_id" FROM "replies" WHERE "id"=$1;`;
  pool.query(getQuery, [replyId])
  .then(response => {
    // console.log(response.rows[0].user_id);
    const itemUserId = Number(response.rows[0].user_id);
    if(itemUserId === req.user.id) {
      // setup SQL query text.
      const queryText = `DELETE FROM "replies" WHERE "id"=$1;`;
      pool.query(queryText, [replyId])
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.log(`Error deleting reply`, err);
        res.sendStatus(500);
      });
    } else {
      res.status(401).send('You are not authorized!');
    }
  })
  .catch(err => {
    console.log('Error getting the user id tied to the reply', err);
    res.sendStatus(500);
  });
});

// PUT route to update a comment body.
router.put('/:commentId', rejectUnauthenticated, (req, res) => {
  // extract commentId from request params
  const commentId = req.params.commentId;
  // get newBody from req.body.
  const newBody = req.body.newBody;
  // setup SQL query text for update
  const queryText = `UPDATE "comments" SET "body"=$1 WHERE "id"=$2 AND "user_id"=$3;`;
  pool.query(queryText, [newBody, commentId, req.user.id])
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log('Error updating comment', err);
    res.sendStatus(500);
  });
});

// PUT route to update a reply.
router.put('/reply/:replyId', rejectUnauthenticated, (req, res) => {
  const replyId = req.params.replyId;
  const newBody = req.body.newBody;
  const queryText = `UPDATE "replies" SET "body"=$1 WHERE "id"=$2 AND "user_id"=$3;`;
  pool.query(queryText, [newBody, replyId, req.user.id])
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log('Error updating reply', err);
    res.sendStatus(500);
  });
});

module.exports = router;
