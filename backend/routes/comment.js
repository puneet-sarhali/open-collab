const express = require("express");
const { checkAuth } = require("../auth");
const router = express.Router()
const pool = require("../db");

//get all comments associated with a single project
router.get("/:projectID", async (req,res) => {
    const query = `SELECT * FROM comment INNER JOIN users ON comment.author_uid = users.id WHERE project_id = $1`

    try{
        const {projectID} = req.params
        const rows = await pool.query(query, [projectID]);
        res.json(rows.rows);
    }catch (err){
        res.send(err.message);
    }
})

//post a comment to a specific project
router.post("/:projectID", async(req, res) => {
    const query = `INSERT INTO comment(project_id, author_uid, content, posted_on, like_count) VALUES($1, $2, $3, $4, $5) RETURNING *`
    try{
        const { project_id, author_uid, content, posted_on, like_count } = req.body;
        const rows = await pool.query(query, [project_id, author_uid, content, posted_on, like_count]);
        res.json(rows.rows);
    }catch (err) {
        res.send(err.message);
    }
})

//update a specific comment like count
router.patch("/:project_id/:comment_id", async(req, res) => {
    const query = `UPDATE comment SET like_count = like_count + $1 WHERE project_id = $2 AND comment_id = $3 RETURNING *`
    try{
        const { project_id, comment_id } = req.params;
        const { like_value } = req.body;
        const result = await pool.query(query, [like_value, project_id, comment_id]);
        res.json(result.rows);
    }catch (err){
        res.send(err.message);
    }
})

//delete a specific comment
router.delete("/:project_id/:comment_id", async(req,res) => {
    const query = `DELETE FROM comment WHERE project_id = $1 AND comment_id = $2`
    try{
        const { project_id, comment_id } = req.params;
        const result = await pool.query(query, [project_id, comment_id]);
        res.json(result.rows)
    }catch (err){
        res.send(err.message);
    }
})


module.exports = router;