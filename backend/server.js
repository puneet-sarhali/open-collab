const express = require('express');
const pool = require("./db");
const cors = require("cors")

app = express();
app.use(express.json())
app.use(cors())

const projectRouter = require('./routes/project')
app.use(('/projects'), projectRouter);

const usersRouter = require('./routes/users')
app.use(('/users'), usersRouter)



app.listen(4999, () => {
    console.log("server running on port 4999");
})