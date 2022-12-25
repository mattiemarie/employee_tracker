const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

// Connect to Database
const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'FL10ngw@yRI!!',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db Database.`)
);