INSERT INTO department (department_id, department_name)
VALUES (1, "Engineering"),
       (2, "Finance"),
       (3, "Legal"),
       (4, "Sale");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", "100000", 4),
       (2, "Salesperson", "80000", 4),
       (3, "Lead Engineer", "150000", 1),
       (4, "Software Engineer", "120000",1),
       (5, "Account Manager", "160000", 2),
       (6, "Accountant", "125000", 2),
       (7, "Legal Team Legal", "250000", 3),
       (8, "Lawyer", "190000", 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)   
VALUES (1, "Brian", "Sella", 1, NULL),
       (2, "Jason", "Yarger", 2, NULL),
       (3, "Chis", "Nunez", 3, 2),
       (4, "Lydia", "Night", 4, 1),
       (5, "Adam", "Abilgaard", 5, 3),
       (6, "Awsten", "Knight", 6, NULL),
       (7, "Cole", "Preston", 7, 4),
       (8, "Jayden", "Seeley", 8, NULL);