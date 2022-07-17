const { ConstantPool } = require("@angular/compiler");
const { Client } = require("pg");

const express = require('express');
const app = express();

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "4476",
  host: "localhost",
  port: 5432,
  database: "open-collab",
});

client.connect();

let query = `select * from "test"`;

client.query('select * from tasks', (err, res) => {
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end;
    }
})
