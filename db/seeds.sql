INSERT INTO department (department_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sale");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", "100000", 4),
       ("Salesperson", "80000", 4),
       ("Lead Engineer", "150000", 1),
       ("Software Engineer", "120000",1),
       ("Account Manager", "160000", 2),
       ("Accountant", "125000", 2),
       ("Legal Team Legal", "250000", 3),
       ("Lawyer", "190000", 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)   
VALUES ("Brian", "Sella", 1, null),
       ("Jason", "Yarger", 2, null),
       ("Chis", "Nunez", 3, 2),
       ("Lydia", "Night", 4, 1),
       ("Adam", "Abilgaard", 5, 3),
       ("Awsten", "Knight", 6, null),
       ("Cole", "Preston", 7, 4),
       ("Jayden", "Seeley", 8, null);
