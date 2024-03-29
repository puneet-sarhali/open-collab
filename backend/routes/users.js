const express = require("express")
const router = express.Router()
const pool = require("../db");
const { checkAuth } = require('../auth');


//create a user
router.post("/", async (req, res) => {
    try {
        const { id , name, email } = req.body;
        const newRow = await pool.query("INSERT INTO users (id, name, email) VALUES($1, $2, $3) RETURNING *", [id, name, email])
        res.json(newRow.rows[0]);
    } catch (err) {
        res.send(err.message);
    }
})

//get all users
router.get("/", async (req, res) => {
    try {
        const newRow = await pool.query("SELECT * FROM users")
        res.json(newRow.rows);
    } catch (err) {
        res.send(err.message);
    }
})

//for votes
router.post("/votes", checkAuth,  async (req,res) => {
    try {
        const { userid, projectid, votevalue } = req.body;
        const rows = await pool.query("INSERT INTO vote (userid, projectid, votevalue) VALUES ($1, $2, $3) RETURNING *", [userid, projectid, votevalue]);
        if(votevalue){
            await pool.query("UPDATE project SET upvotes = upvotes + 1 WHERE projectid = $1 RETURNING *", [projectid]);
            await pool.query("UPDATE project SET score = score + 1 WHERE projectid = $1 RETURNING *", [projectid]);
        }else{
            await pool.query("UPDATE project SET downvotes = downvotes + 1 WHERE projectid = $1 RETURNING *", [projectid]);
            await pool.query("UPDATE project SET score = score - 1 WHERE projectid = $1 RETURNING *", [projectid]);
        }
        res.json(rows.rows[0]);
    } catch (error) {
        res.send(error.message);
        console.log(error.message);
    }
})


//get a specific user
router.route("/:id")
    .get(async (req, res) => {
        try {
            const { id } = req.params;
            const newRow = await pool.query("SELECT * FROM users WHERE id = $1", [id])
            res.json(newRow.rows[0]);
        } catch (err) {
            res.send(err.message);
        }
    }).put(checkAuth, async (req, res) => {
        try {
            const { id , name, email } = req.body;
            const newRow = await pool.query
            ("UPDATE users SET id = $1, name = $2, email = $3 WHERE id = $4 RETURNING *",
                             [id, name, email, id]);
            res.json(newRow.rows[0]);
        } catch (err) {
            res.send(err.message);
        }
    }).delete(checkAuth, async (req, res) => {
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
    .put(checkAuth, async (req,res) => {
        try {
            const { uid, pid } = req.params;
            const { userid, projectid, votevalue } = req.body;
            const rows = await pool.query
                ("UPDATE vote SET userid = $1, projectid = $2, votevalue = $3 WHERE userid = $4 AND projectid = $5 RETURNING *", [userid, projectid, votevalue, uid, pid]);

            if(votevalue){
                await pool.query("UPDATE project SET upvotes = upvotes + 1, downvotes = downvotes - 1 WHERE projectid = $1 RETURNING *", [projectid]);
                await pool.query("UPDATE project SET score = score + 2 WHERE projectid = $1 RETURNING *", [projectid]);
            }else{
                await pool.query("UPDATE project SET downvotes = downvotes + 1, upvotes = upvotes - 1 WHERE projectid = $1 RETURNING *", [projectid]);
                await pool.query("UPDATE project SET score = score - 2 WHERE projectid = $1 RETURNING *", [projectid]);
            }
            res.json(rows.rows);
        } catch (error) {
            res.send(error.message);
        }
    })
router.delete("/votes/:uid/:pid/:votevalue", checkAuth, async (req,res) => {
        try {
            const { uid, pid, votevalue} = req.params;

            if(votevalue == 'true'){
                await pool.query("UPDATE project SET upvotes = upvotes - 1 WHERE projectid = $1 RETURNING *", [pid]);
                await pool.query("UPDATE project SET score = score - 1 WHERE projectid = $1 RETURNING *", [pid]);
            }else if(votevalue == 'false'){
                await pool.query("UPDATE project SET downvotes = downvotes - 1 WHERE projectid = $1 RETURNING *", [pid]);
                await pool.query("UPDATE project SET score = score + 1 WHERE projectid = $1 RETURNING *", [pid]);
            }
            const rows = await pool.query("DELETE FROM vote WHERE userid = $1 AND projectid = $2", [uid, pid]);
            res.json(rows.rows);
        } catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    })

module.exports = router

