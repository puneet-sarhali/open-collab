const express = require('express');
const pool = require("./db");
const cors = require("cors")
const admin = require('firebase-admin')

var serviceAccount = require("./open-collab-cmpt372-firebase-adminsdk-2ao0y-abc930ebbd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



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