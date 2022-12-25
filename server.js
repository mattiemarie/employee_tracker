const express = require('express');
const inquirer = require('inquirer');
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

mainChoice();

// Main Choice for Employee Database
function mainChoice() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'mainChoice',
                message: 'What would you like to do?',
                choices:['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
             }
        ]).then (function(data) {
            switch(data.mainChoice) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
            };
        });
};

// View all Employees CHOICE
function viewAllEmployees() {
db.query('SELECT * FROM employee', function (err, results)
{
    console.log(results);
});
};

// Add Employee CHOICE
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'mainChoice',
                message: 'What would you like to do?',
                choices:['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
             }
        ]);
};

// Update Employee Role CHOICE
function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'mainChoice',
                message: 'What would you like to do?',
                choices:['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
             }
        ]);
};

// Add Role CHOICE
function addRole() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'mainChoice',
                message: 'What would you like to do?',
                choices:['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
             }
        ]);
};

// View All Departments CHOICE
function viewAllDepartments() {
db.query('SELECT * FROM department', function (err, results)
{
    console.log(results);
});
};

// Add Department CHOICE
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'mainChoice',
                message: 'What would you like to do?',
                choices:['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
             }
        ]);
};