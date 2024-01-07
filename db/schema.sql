
USE employee_tracker;
-- Created a table to store dept. information.
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identifier for each department auto increments.
    name VARCHAR(30) NOT NULL -- Name of the department cannot be null.
);

-- Created a table to store roles within the company.
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identifier for each department auto increments.
    title VARCHAR(30) NOT NULL, -- Name of the role cannot be null.
    salary DECIMAL (10, 2) NOT NULL, -- The salary amount cannot be null.
    department_id INT, -- Links to the department the role belongs to.
    FOREIGN KEY (department_id) REFERENCES department(id) -- Foreign key to the department table.
);

-- Created a table to store employee info.
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identifier for each employee auto-increments.
    first_name VARCHAR(30) NOT NULL, -- The first and last name for the employee cannot be null.
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT NULL, -- The employees manager cannot be null.
    FOREIGN KEY (role_id) REFERENCES role(id), -- Foreign key to role table.
    FOREIGN KEY (manager_id) REFERENCES employee(id) -- Foreign key within employee table under the manager.
);