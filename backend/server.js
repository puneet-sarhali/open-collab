const express = require("express");
const pool = require("./db");
const cors = require("cors");
const admin = require("firebase-admin");

var serviceAccount = require("./open-collab-cmpt372-firebase-adminsdk-2ao0y-abc930ebbd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// admin.auth().setCustomUserClaims("ZtYT7z1bSfMzTlOPP29mVj9BvQs2", {admin: true}).then((res) => console.log("success")).catch(err => console.log("failed"));

app = express();
app.use(express.json());
app.use(cors());

const projectRouter = require("./routes/project");
app.use("/projects", projectRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const commentRouter = require("./routes/comment");
app.use("/projects/comments", commentRouter);

const kanbanRouter = require("./routes/kanban");
app.use("/tasks", kanbanRouter);

app.listen(4999, () => {
  console.log("server running on port 4999");
});
