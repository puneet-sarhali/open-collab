const express = require("express")
const router = express.Router()
const pool = require("../db");

//create a project
router.post("/", async (req, res) => {
    try {
        const { projectname, description, upvotes, downvotes, score, userid, createdat } = req.body;
        const newRow = await
        pool.query("INSERT INTO project (projectName, description, upvotes, downvotes, score, userid, createdat) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                             [projectname, description, upvotes, downvotes, score, userid, createdat]);
        res.json(newRow.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get all projects
router.get("/", async (req, res) => {
    try{
        const allprojects = await pool.query
        (`SELECT * FROM project
        INNER JOIN users
        ON project.userid = users.id`);
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
