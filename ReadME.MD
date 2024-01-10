# Employee Tracker

## Description

Employee Tracker is a command-line application to manage a company's employee database, created with Node.js, Inquirer, and MySQL. This CLI application streamlines the process of viewing, adding, and updating employees, roles, and departments within a company.

## Installation

1. Clone the repository: https://github.com/J-Ross01/Employee-tracker

## Usage 

Run the following command: "node index.js". - In the index.js file. 
Here's a screen recorded demo on how to use the application: https://drive.google.com/file/d/1hm3jixYuLMIXAkO6KnaCa9TK9pfeieXK/view

## Features

1. View All Employees: Display a table with employee details including role title, manager name, department, and salary.
2. Add Employee: Input employee details and select their role, manager, and department from a dynamically generated lists.
3. Update Employee Role: Change an employee's role with an updated list of available roles.
4. View All Roles: Display a table of all roles with corresponding departments and salaries.
5. Add Role: Input new role details including title, salary, and associated department.
6. View All Departments: Show all departments in the company.
7. Add Department: Create a new department by providing its name.

## Configuration 

Create a .env file in the root directory to store your MySQL database configuration Example: 
DB_HOST=your_mysql_host
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=employee_tracker

## Database Setup

1. Set up the database structure by executing the schema.sql file in your MySQL environment.
2. Optionally, use seeds.sql to populate your database with pre-set data.

## Technologies Used

1. Node.js
2. Inquirer.js
3. MySQL
4. dotenv

## Contributing 

Contributions to the project are welcome, here's how you can contribute:

1. Fork the repository.
2. Create a branch for each feature or improvement.
3. Submit a pull request from your feature branch to the main branch.

# Sources

The following resources were used in the development of this Employee Tracker project:

- Official MySQL Documentation: [MySQL Docs](https://dev.mysql.com/doc/)
- Node.js Documentation: [Node.js Docs](https://nodejs.org/en/docs/)
- MDN Web Docs: [MDN](https://developer.mozilla.org/en-US/) for JavaScript syntax practices.
- Inquirer: https://www.digitalocean.com/community/tutorials/nodejs-interactive-command-line-prompts & https://www.npmjs.com/package/inquirer/v/8.2.4
- MySQL2 installation guide: https://www.npmjs.com/package/mysql2
- Setting up the dotenv file: https://stackoverflow.com/questions/26973484/how-do-i-setup-the-dotenv-file-in-node-js
- Using await expressions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await 
- Using Switch statements: https://www.w3schools.com/js/js_switch.asp#:~:text=The%20value%20of%20the%20expression,default%20code%20block%20is%20executed.
- Using parse functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat

## License 

This project is released under the MIT License: MIT License

Copyright (c) 2024 J-Ross01

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
