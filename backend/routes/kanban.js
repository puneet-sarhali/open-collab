const express = require("express");
var cors = require("cors");
const router = express.Router();
const pool = require("../db");

// create a task
router.post("/", async (req, res) => {
  try {
    const { taskid, title, content, category, projectid, assignedto } =
      req.body;

    const newTask = await pool.query(
      "INSERT INTO task (taskid, title, content, category, projectid, assignedto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [taskid, title, content, category, projectid, assignedto]
    );

    res.json(newTask.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// getting all the tasks
router.get("/", async (req, res) => {
  try {
    const allTasks = await pool.query(
      // `SELECT * FROM task INNER JOIN users ON task.assignedto = users.id`
      "SELECT * FROM task"
    );

    res.json(allTasks.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// getting ONE task
router.get("/:taskid", async (req, res) => {
  try {
    const { taskid } = req.params;
    const task = await pool.query("SELECT * FROM task WHERE taskid = $1", [
      taskid,
    ]);
  } catch (error) {
    console.error(error.message);
  }
});

// delete A task
router.delete("/:taskid", async (req, res) => {
  try {
    const { taskid } = req.params;
    const deleteTask = await pool.query("DELETE FROM task WHERE taskid = $1", [
      taskid,
    ]);
    res.json(deleteTask.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// update a task's category and assignedto !

router.put("/:taskid", async (req, res) => {
  try {
    let id = req.params.taskid;
    let cat = req.body.category;
    let assignee = req.body.assignedto;

    const updateTask = await pool.query(
      "UPDATE task SET category = $1, assignedto = $2 WHERE taskid = $3 RETURNING *",
      [cat, assignee, id]
    );
    res.json(updateTask.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
