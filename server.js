const inquirer = require('inquirer');
const mysql = require('mysql2');
const conTab = require('console.table');

const PORT = process.env.PORT || 3001
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

// Connect info for mySQL database
const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'FL10ngw@yRI!!',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db Database.`)

);

// Connecting to mySQL server/database
db.connect(function(err) {
    if(err) throw err;
    console.log('SQL is connected');

   // Main Choice will begin
   mainChoice(); 
});


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
    if(err) throw err;
    console.table(results);
    mainChoice();
});
};

// Add Employee CHOICE
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeFirstName',
                message: "What is the Employee's First Name?",
             },
             {
                type: 'input',
                name: 'employeeLastName',
                message: "What is the Employee's Last Name?",
             },
             {
                type: 'list',
                name: 'employeeRole',
                message: "What is the Employee's Role?",
                choices:['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager','Accountant', 'Legal Team Lead', 'Lawyer'],
             },
             {
                type: 'list',
                name: 'employeeManager',
                message: "Who is the Employee's Manager?",
                choices:['Lydia Night', 'Chris Nunez', 'Adam Abilgaard', 'Cole Preston', 'None'],
             }

        ]).then (function(data) {
/////////////////////////////////////////////////////////////////////////////////////////
        });
};

// Update Employee Role CHOICE
function updateEmployeeRole()
////////////////////////////////////////

// Add Role CHOICE
function addRole() {
    inquirer
          .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: "What is the Name of the Role?",
             },
             {
                type: 'input',
                name: 'roleSalary',
                message: "What is the Salary of the Role?",
             },
             {
                type: 'list',
                name: 'department',
                message: "Which Department does the Role belong to?",
                choices:['Engineering', 'Finance', 'Legal', 'Sale'],
             }
        ]).then (function(data) {
            db.query(
                "INSERT INTO role SET ?",
                {
                    title: data.roleName,
                    salary: data.roleSalary,
                    department_id: data.department
                },
                function(err) {
                    if (err) throw err;
                    console.log('Employee Roles updated');
                    mainChoice();
                }
            )
        });
};

// View All Departments CHOICE
function viewAllDepartments() {
db.query('SELECT * FROM department', function (err, results)
{
    if(err) throw err;
    console.table(results);
    mainChoice();
});
};

// Add Department CHOICE
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: "What is the name of the Department?",
             },

        ]).then (function(data) {
            db.query (
                "INSERT INTO department VALUES (DEFAULT, ?)",
                [data.department],
                function(err) {
                    if(err) throw err;
                    console.log('Departments Updated')
                    mainChoice();
                }
            )
        });
};