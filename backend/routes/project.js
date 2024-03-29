const express = require("express");
const { checkAuth } = require("../auth");
const router = express.Router()
const pool = require("../db");


//create a project
router.post("/",checkAuth, async (req, res) => {
    try {
        const { projectname, description, upvotes, downvotes, score, userid, createdat, tag1, tag2, tag3, github } = req.body;
        const newRow = await
        pool.query("INSERT INTO project (projectName, description, upvotes, downvotes, score, userid, createdat, tag1, tag2, tag3, github) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
                             [projectname, description, upvotes, downvotes, score, userid, createdat, tag1, tag2, tag3, github]);
        res.json(newRow.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get all projects
router.get("/", async (req, res) => {
    const sort_by = req.query.sort_by;
    const order = req.query.order;
    try{
        const allprojects = await pool.query
        (`SELECT * FROM project
        INNER JOIN users
        ON project.userid = users.id
        ORDER BY project.${sort_by} DESC`);
        res.json(allprojects.rows);
    }catch (err){
        console.error(err.message);
    }
})


//get a project
router.get("/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const project = await pool.query("SELECT * FROM project INNER JOIN users ON project.userid = users.id WHERE projectid = $1 ", [id]);
        res.json(project.rows[0]);
    }catch (err){
        console.error(err.message);
    }
})

//get all projects by a specific user
router.get("/users/:uid", async (req, res) => {
    const {uid} = req.params;
    try {
        const newRow = await pool.query("SELECT * FROM project INNER JOIN users ON project.userid = users.id WHERE users.id = $1", [uid]);
        res.json(newRow.rows);
    } catch (err) {
        res.send(err.message);
    }
})

//update a project
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { projectname, description, upvotes, downvotes, score, userid, createdat } = req.body;
        const newRow = await pool.query
        ("UPDATE project SET projectName = $1, description = $2, upvotes = $3, downvotes = $4, score = $5, userid = $7, createdat = $8 WHERE projectid = $6 RETURNING *",
                             [projectname, description, upvotes, downvotes, score, id, userid, createdat]);
        res.json(newRow.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//patch project info
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { projectname, description, tag1, tag2, tag3, github } = req.body;
        const newRow = await pool.query
        ("UPDATE project SET projectName = $1, description = $2, tag1 = $3, tag2 = $4, tag3 = $5, github = $6 WHERE projectid = $7 RETURNING *",
                             [projectname, description, tag1, tag2, tag3, github, id]);
        res.json(newRow.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//delete a project
router.delete("/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const deleteproject = await pool.query("DELETE FROM project WHERE projectid = $1", [id]);
        res.json(deleteproject.rows[0]);
    }catch (err){
        console.error(err.message);
        res.status(404).send('ERROR: not idea which error though');
    }
})

// router.patch("/:id/upvote", async (req, res) => {
//     try{
//         const {id} = req.params;
//         const row = await pool.query("UPDATE project SET upvotes = upvotes + 1 WHERE projectid = $1 RETURNING *", [id]);
//         res.json(row.rows[0]);
//     }catch (err){
//         console.error(err.message);
//         res.status(404).send('ERROR: not idea which error though');
//     }
// })


module.exports = router
