const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

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

router.post('/like/:ftnId', rejectUnauthenticated, (req, res) => {
    // extract ftn id from req params
    const ftnId = req.params.ftnId;
    // if likes is not 0 then add a new entry.
    const queryText = `INSERT INTO "ratings" ("user_id", "fountain_id", "likes")
    VALUES($1, $2, $3);`;
    pool.query(queryText, [req.user.id, ftnId, 1])
    .then(() => {
        res.sendStatus(201);
    })
    .catch(err => {
        // if entry already exists send back 418 as an error.
        if(Number(err.code) === 23505) {
            // setup get query text to get the current likes of the fountain with user id.
            const getQuery = `SELECT "likes" FROM "ratings" WHERE "user_id"=$1 and "fountain_id"=$2;`;
            pool.query(getQuery, [req.user.id, ftnId])
            .then(response => {
                // res.send(response.rows[0].likes);
                const likes = Number(response.rows[0].likes);
                // if likes is not zero then update likes to 1.
                if(likes === 0) {
                    // setup SQL query text.
                    const queryText = `UPDATE "ratings" SET "likes"=$1 WHERE "user_id"=$2 AND "fountain_id"=$3;`;
                    pool.query(queryText, [1, req.user.id, ftnId])
                    .then(() => {
                        res.sendStatus(201);
                    })
                    .catch(err => {
                        console.log('error in updating a like', err);
                        // res.sendStatus(500);
                        res.status(418).send('Already liked by user.');
                    });
                }});
        }
    })
    .catch(err => {
        console.log('Error getting likes', err)
        res.sendStatus(500);
    });
});

// a PUT route to UPDATE the likes for a fountain.
router.put('/like/:ftnid', rejectUnauthenticated, (req, res) => {
    const ftnId = req.params.ftnid;
    const queryText = `UPDATE "ratings" SET "likes"=$1 WHERE "user_id"=$2 AND "fountain_id"=$3 RETURNING *;`;
    pool.query(queryText, [0, req.user.id, ftnId])
    .then((response) => {
        // console.log(response.rows);
        // if(!response.rows[0]) {
        //     const queryText = `INSERT INTO "ratings" ("user_id", "fountain_id", "likes")
        //     VALUES($1, $2, $3);`;
        //     pool.query(queryText, [req.user.id, ftnId, 0]);
        // } else {
        //     res.sendStatus(201);
        // }
        res.sendStatus(201);
    })
    .catch(err => {
        console.log('Error removing like', err);
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
