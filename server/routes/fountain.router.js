const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all of the fountain data from the database.
router.get('/', (req, res) => {
    // setup SQL query text.
    const queryText = `SELECT * FROM "fountains";`;
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
    const queryText = `SELECT * FROM "fountains" WHERE "id"=$1;`;
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
