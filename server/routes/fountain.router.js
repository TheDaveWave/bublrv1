const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET all of the fountain data from the database.
router.get('/', (req, res) => {
    // setup SQL query text.
    const queryText = `SELECT "f".*,
    COALESCE(SUM("r"."likes"),0) AS "likes",
    COALESCE(ROUND(AVG(NULLIF("r"."rating",0)),1),0) AS "rating"
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
    COALESCE(ROUND(AVG(NULLIF("r"."rating",0)),1),0) AS "rating"
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

// POST route to add a fountain to the DB.
router.post('/', rejectUnauthenticated, (req, res) => {
    if(req.user.admin) {
        // shorten req.body by assigning it to a variable b.
        const b = req.body;
        const queryText = `INSERT INTO "fountains" ("user_id", "latitude", "longitude", "picture", "laminar_flow",
        "turbulent_flow", "bottle_accessible", "outdoor", "indoor")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
        const values = [req.user.id, b.lat, b.lng, b.picture, b.laminar, b.turbulent, b.bottle, b.outdoor, b.indoor];
        pool.query(queryText, values)
        .then(() => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.log('Error adding fountain', err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

// PUT route to update a fountain's information.
router.put('/:ftnId', rejectUnauthenticated, (req, res) => {
    // check if the user is an admin.
    if(req.user.admin) {
        // shorten req.body by assigning it to a variable b.
        const b = req.body;
        const ftnId = req.params.ftnId;
        const queryText = `UPDATE "fountains"
            SET "latitude"=$1, "longitude"=$2, "picture"=$3, "laminar_flow"=$4,
                "turbulent_flow"=$5, "bottle_accessible"=$6, "outdoor"=$7, "indoor"=$8
            WHERE "id"=$9;`;
        const values = [b.lat, b.lng, b.picture, b.laminar, b.turbulent, b.bottle, b.outdoor, b.indoor, ftnId];
        pool.query(queryText, values) 
        .then(() => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.log('Error updating fountain', err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

// POST route to add a like.
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

// PUT route to update rating
router.put('/rating/:ftnId', rejectUnauthenticated, (req, res) => {
    // extract fountain Id from req params.
    const ftnId = req.params.ftnId;
    // get the rating from the request body.
    const rating = req.body.rating;
    // setup SQL query text for inserting a rating.
    const insertQuery = `INSERT INTO "ratings" ("user_id", "fountain_id", "rating")
    VALUES($1, $2, $3);`
    pool.query(insertQuery, [req.user.id, ftnId, rating])
    .then(() => {
        res.sendStatus(201);
    })
    .catch(err => {
        // res.sendStatus(500);
        if(Number(err.code) === 23505) {
            // setup SQL query text.
            const queryText = `UPDATE "ratings" SET "rating"=$1 WHERE "user_id"=$2 AND "fountain_id"=$3;`;
            pool.query(queryText, [rating, req.user.id, ftnId])
            .then(() => {
                res.sendStatus(201);
            })
            .catch(err => {
                console.log('Error rating fountain', err);
                res.sendStatus(500);
            });
        } else {
            console.log('Erroring adding a rating', err);
            res.sendStatus(500);
        }
    });
});


module.exports = router;
