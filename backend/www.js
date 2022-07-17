/* 
https://medium.com/swlh/angular-node-and-postgresql-4a07d597be07
*/

const express = require('express');
const bodyParser = require("body-parser");
const app = express();

// Store localy in node
let user = [];
const rootUrl = '/api';

app.use(bodyParser.json());
app.get('/api/status', (req, res) => {
  res.json({info: 'Node.js, Express, and Postgres API'});
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Listen on env var port, else 3080
const PORT = process.env.PORT || 3080;
const server = app.listen(PORT, () => {
  console.log(`Server Running: http://localhost:${PORT}`);
});

// User access
app.get(`${rootUrl}/user`, (req, res) => { res.json(user); });
app.post(`${rootUrl}/user`, (req, res) => {
  const reqUser = req.body.user;
  user = [];
  user.push(reqUser);
  res.json(user);
});

/**
 * The SIGTERM signal is a generic signal used to cause program 
 * termination. Unlike SIGKILL , this signal can be blocked, 
 * handled, and ignored. It is the normal way to politely ask a 
 * program to terminate. The shell command kill generates 
 * SIGTERM by default.
 */
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server Close: Process Terminated!');
    });
});