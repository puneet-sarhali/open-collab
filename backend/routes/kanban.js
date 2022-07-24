const express = require("express");
const router = express.Router();
const pool = require("../db");

//router.use(express.json());

// create a task
router.post("/", async (req, res) => {
  try {
    const { taskid, title, content, category } = req.body;

    const newTask = await pool.query(
      //TODO: ADD BACK THE projectid and the assignedto
      "INSERT INTO task (taskid, title, content, category) VALUES ($1, $2, $3, $4) RETURNING *",
      [taskid, title, content, category]
    );

    res.json(newTask.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// getting all the tasks
router.get("/", async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM task");
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

module.exports = router;
