const express = require("express")
const router = express.Router()
const pool = require("../db");


    
router.post("/", async (req, res) => {
    try {
        const { id , name, email } = req.body;
        const newRow = await pool.query("INSERT INTO users (id, name, email) VALUES($1, $2, $3) RETURNING *", [id, name, email])
        res.json(newRow.rows[0]);
    } catch (err) {
        res.send(err.message);
    }
})

router.get("/", async (req, res) => {
    try {
        const newRow = await pool.query("SELECT * FROM users")
        res.json(newRow.rows);
    } catch (err) {
        res.send(err.message);
    }
})

//for votes
router.post("/votes", async (req,res) => {
    try {
        const { userid, projectid, votevalue } = req.body;
        const rows = await pool.query("INSERT INTO vote (userid, projectid, votevalue) VALUES ($1, $2, $3) RETURNING *", [userid, projectid, votevalue]);
        res.json(rows.rows[0]);
    } catch (error) {
        res.send(error.message);
        console.log(error.message);
    }
})


//for user
router.route("/:id")
    .get(async (req, res) => {
        try {
            const { id } = req.params;
            const newRow = await pool.query("SELECT * FROM users WHERE id = $1", [id])
            res.json(newRow.rows[0]);
        } catch (err) {
            res.send(err.message);
        }
    }).put(async (req, res) => {
        try {
            const { id , name, email } = req.body;
            const newRow = await pool.query
            ("UPDATE users SET id = $1, name = $2, email = $3 WHERE id = $4 RETURNING *",
                             [id, name, email, id]);
            res.json(newRow.rows[0]);
        } catch (err) {
            res.send(err.message);
        }
    }).delete(async (req, res) => {
        try {
            const { id } = req.params;
            const newRow = await pool.query("DELETE FROM users WHERE id = $1", [id])
            res.json(newRow.rows[0]);
        } catch (err) {
            res.send(err.message);
        }
    })

router.route("/votes/:uid")
    .get(async (req,res) => {
        try {
            const { uid } = req.params;
            const rows = await pool.query("SELECT * FROM vote WHERE userid = $1", [uid]);
            res.json(rows.rows);
        } catch (error) {
            res.send(error.message);
        }
    })

//for votes
router.route("/votes/:uid/:pid")
    .get(async (req,res) => {
        try {
            const { uid, pid } = req.params;
            const rows = await pool.query("SELECT * FROM vote WHERE userid = $1 AND projectid = $2", [uid, pid]);
            res.json(rows.rows);
        } catch (error) {
            res.send(error.message);
        }
    })
    .put(async (req,res) => {
        try {
            const { uid, pid } = req.params;
            const { userid, projectid, votevalue } = req.body;
            const rows = await pool.query
                ("UPDATE vote SET userid = $1, projectid = $2, votevalue = $3 WHERE userid = $4 AND projectid = $5 RETURNING *", [userid, projectid, votevalue, uid, pid]);
            res.json(rows.rows);
        } catch (error) {
            res.send(error.message);
        }
    }).delete(async (req,res) => {
        try {
            const { uid, pid } = req.params;
            const rows = await pool.query("DELETE FROM vote WHERE userid = $1 AND projectid = $2", [uid, pid]);
            res.json(rows.rows);
        } catch (error) {
            res.send(error.message);
        }
    })

module.exports = router

