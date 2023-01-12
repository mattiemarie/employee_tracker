const inquirer = require('inquirer');
const cTable = require('console.table');
var mysql = require("mysql2");

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
                choices:['View All Employees', 'Add Employee', 'Update Employee Role','View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
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
                case "View All Roles":
                    viewAllRoles();
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

// View all Employees CHOICE //Needs Job Title, Department, Salary, Manager
function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results)
    {
        if(err) throw err;
        console.table(results);
        mainChoice(); 
    });
};

// Add Employee CHOICE //Needs Role, Manager
function addEmployee() {
    db.query("SELECT * FROM role", function(err, results){
        if(err) throw err;
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
                    type: 'number',
                    name: 'employeeRole',
                    message: "What is the Employee's Role ID?"
                },
                {
                    type: 'number',
                    name: 'employeeManager',
                    validate: function(value) {
                        if(isNaN(value) === false){
                        return true;
                        }
                        return false;
                    },
                    message: "What is the Manager ID Number?",
                }

            ]).then (function(data) {
                db.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: data.employeeFirstName,
                        last_name: data.employeeLastName,
                        role_id: data.employeeRole,
                        manager_id: data.employeeManager
                    },
                )
                
                console.log('Employee Added Successfully');
                mainChoice(); 
            });
            
    });
};

// Update Employee Role CHOICE
function updateEmployeeRole() {
    db.query('SELECT * FROM employee',
        function (err, results) {
        if(err) throw err;
        inquirer
            .prompt ([
                {
                    type: 'list',
                    name: 'employeeChoice',
                    choices: function() {
                        let employeeChoiceArr = [];
                        for(i=0; i < results.length; i++)
                        {
                            employeeChoiceArr.push(results[i].last_name);
                        }
                        return employeeChoiceArr;
                    },
                    message: 'Which Employee would you like to update?'
                }
            ])
            .then(function(data){
                const employeeName = data.employeeChoice;
            
                db.query("SELECT * FROM employee",
                function(err, results) {
                    if(err) throw err;
                inquirer
                    .prompt ([
                        {
                            type: 'list',
                            name: 'updatedRole',
                            choices: function() {
                                let employeeChoiceArr = [];
                                for(i=0; i < results.length; i++)
                                {
                                    employeeChoiceArr.push(results[i].role_id);
                                }
                                return employeeChoiceArr;
                            },
                            message: "What is the Employee's new Role?"
                        },
                        {
                            type: 'number',
                            name: 'updatedManager',
                            validate: function(value) {
                                if(isNaN(value) === false){
                                    return true;
                                }
                                return false;
                            },
                            message: "What is the Manager ID Number?",
                        }
                    ]).then(function(data){
                    db.query('UPDATE employee SET ? WHERE last_name = ?',
                        [
                            {
                                role_id: data.updatedRole,
                                manager_id: data.updatedManager
                            }, employeeName
                        ],
                    ),
                    console.log('Employee Role has been Updated');

                    mainChoice(); 
                    });
                })
            }) 
    }); 
}

// View all Roles CHOICE
function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results)
    {
        if(err) throw err;
        console.table(results);
        mainChoice(); 
    });
};


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
                    type: 'number',
                    name: 'department',
                    message: "Which Department ID does the Role belong to?",
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
                    if(err) throw err;
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
                "INSERT INTO department set ?",
                {
                    department_name: data.departmentName
                },
                function(err) {
                    if(err) throw err;
                    console.log('Departments Updated');
                    mainChoice(); 
                }
            )
        });
};