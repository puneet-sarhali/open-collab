const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "postgres",
    password: "4476",
    host: "localhost",
    port: 5432,
    database: "open-collab"
});

module.exports = pool;