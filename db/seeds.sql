--Inserted four department names into the department table. 
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Human Resources');
INSERT INTO department (name) VALUES ('Finance');
INSERT INTO department (name) VALUES ('Marketing');

-- Inserted the job title, salary, and department id. Each id number is based off the order of department names added into the department table. 
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 70000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Senior Software Engineer', 90000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 75000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 65000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Director', 60000, 4);

-- Adding the employees names, role id, and manager id. 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jim', 'Bob', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Ricky', 'Bobby', 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Bob', 'Builder', 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Emma', 'Stone', 5, 4);
