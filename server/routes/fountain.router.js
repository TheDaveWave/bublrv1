const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all of the fountain data from the database.
router.get('/', (req, res) => {
    // setup SQL query text.
    const queryText = `SELECT "f".*,
    COALESCE(SUM("r"."likes"),0) AS "likes",
    COALESCE(ROUND(AVG("r"."rating"),1),0) AS "rating"
    FROM "fountains" AS "f"
    LEFT JOIN "ratings" AS "r" ON "r"."fountain_id"="f"."id"
    GROUP BY "f"."id"
    ORDER BY "rating" DESC;`;
    pool.query(queryText)
    .then(response => {
        res.send(response.rows);
    })
    .catch(err => {
        console.log(`Error in getting fountains`, err);
        res.sendStatus(500);
    });
});

// GET route to get fountain by id.
router.get('/:ftnId', (req, res) => {
    // user params to get the value of the id.
    const ftnId = req.params.ftnId;
    // SQL query text using data sanitization.
    const queryText = `SELECT "f".*,
    COALESCE(SUM("r"."likes"),0) AS "likes",
    COALESCE(ROUND(AVG("r"."rating"),1),0) AS "rating"
    FROM "fountains" AS "f"
    LEFT JOIN "ratings" AS "r" ON "r"."fountain_id"="f"."id"
    GROUP BY "f"."id"
    HAVING "f"."id"=$1;`;
    pool.query(queryText, [ftnId])
    .then(response => {
        res.send(response.rows);
    })
    .catch(err => {
        console.log(`Error getting fountain with id:${ftnId}`, err);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
