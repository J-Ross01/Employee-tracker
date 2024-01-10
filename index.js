// Imports the specified modules and intializes the environment variables. 
const inquirer = require('inquirer');
const Database = require('./lib/queries');
const utils = require('./lib/utils');
require('dotenv').config();
// Flag to prevent multiple initializations.
let isStarted = false;
// DB config from environment variables. 
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};
// Create a new database instance.
const db = new Database(dbConfig);
// Displays the questions for the main menu. 
const mainMenuQuestions = [
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Quit',
      ],
    },
  ];
  // Start function to initialize the application.
  async function start() {
    if (isStarted) return;// Prevents re-cursive calls to the start function.
    isStarted = true;

      await db.init();// Initialize database connection.
      mainMenu(); 
  }
// Start the application and catch any errors.
start().catch(err => console.error(err));

async function mainMenu() {
    try {
        const { action } = await inquirer.prompt(mainMenuQuestions);
        switch (action) {
            case 'View All Employees':// Additional cases for every action. 
                await viewAllEmployees();
                break;
            case 'Add Employee':
                await addEmployee();
                break;
            case 'Update Employee Role':
                await updateEmployeeRole();
                break;
            case 'View All Roles':
                await viewAllRoles();
                break;
            case 'Add Role':
                await addRole();
                break;
            case 'View All Departments':
                await viewAllDepartments();
                break;
            case 'Add Department':
                await addDepartment();
                break;
            case 'Quit':
                console.log('Goodbye!'); 
                await db.close(); // Closes the connection to the db. 
                return; 
        }
        mainMenu(); // Should show the main menu again after completing an action. 
    } catch (error) {
        console.error('Error in main menu:', error);
        await db.close(); // Closes the connection to the db. 
    }
}
  
// Displays all employees. 
async function viewAllEmployees() {
    try {
        // SQL query to join employee, role, and department tables and format the output.
        const query = `
            SELECT e.id, 
                   e.first_name, 
                   e.last_name, 
                   r.title as role_title, 
                   d.name as department_name, 
                   r.salary, 
                   CONCAT(m.first_name, ' ', m.last_name) as manager_name
            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id`;
            // The 'SELECT Clause' will retrieve specified coloumns from the db and each column is identified with an alias to avoid ambiguity. 
            // The 'FROM Clause' will indicate the main table in which the data is being pulled from. 
            // The 'LEFT JOIN Clauses' will include data from other related tables and even if some employees don't have data in specific coloumns they will still be included in the result, but with a NULL value. 
        const [employees] = await db.connection.execute(query);

        console.table(employees); // Display the employees in a table format. 
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
}
// Function to add an employee. 
async function addEmployee() {
    // Fetch roles, employees, and departmens and display them as choices. 
    const roles = await db.viewAllRoles();
    const employees = await db.viewAllEmployees();
    const departments = await db.viewAllDepartments();
    // Map over roles, employees, and departments to format for inquirer choices.
    const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
    }));

    const employeeChoices = employees.map(emp => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id
    }));

    const departmentChoices = departments.map(dept => ({ 
        name: dept.name,
        value: dept.id
    }));
    // Prompts user for new employee details. 
    const employeeData = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "Enter the employee's first name:",
            validate: utils.notEmpty
        },
        {
            type: 'input',
            name: 'lastName',
            message: "Enter the employee's last name:",
            validate: utils.notEmpty
        },
        {
            type: 'list',
            name: 'roleId',
            message: "Select the employee's role:",
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'managerId',
            message: "Select the employee's manager (leave blank for none):",
            choices: [{ name: 'None', value: null }, ...employeeChoices],
            default: null
        },
        {
            type: 'list',
            name: 'departmentId',
            message: "Select the employee's department:",
            choices: departmentChoices
        },
    ]);

    try {
        // Constructs the new employee object. 
        const newEmployee = {
            first_name: employeeData.firstName,
            last_name: employeeData.lastName,
            role_id: employeeData.roleId,
            manager_id: employeeData.managerId,
            department_id: employeeData.departmentId
        };

        await db.addEmployee(newEmployee); // Adds the employee to the database. 
        console.log('Employee added successfully'); 
    } catch (error) {
        console.error('Error adding employee:', error);
    }
}


async function updateEmployeeRole() {
    
    const employees = await db.viewAllEmployees(); 
    const roles = await db.viewAllRoles();
    // Retrieves the list of employees and roles for the user to choose from. 
    const updateRoleData = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: "Which employee's role do you want to update?",
            choices: utils.formatEmployeeList(employees)
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Select the new role:',
            choices: utils.formatRoleList(roles)
        }
    ]);
    // Performs the update operation in the database. 
    await db.updateEmployeeRole(updateRoleData.employeeId, updateRoleData.roleId);
    console.log('Employee role updated successfully.');
}

async function viewAllRoles() {
    try {
        const roles = await db.viewAllRoles(); // Display all roles from the db. 
        console.table(roles);
    } catch (error) {
        console.error('Error fetching roles:', error);
    }
}
  
async function addRole() {
    const departments = await db.viewAllDepartments();  
    const roleData = await inquirer.prompt([ // Prompts the user for role details and adds it to the database.
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the new role:',
            validate: utils.notEmpty
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for this role:',
            validate: utils.notEmpty 
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select the department for this role:',
            choices: utils.formatDepartmentList(departments)
        }
    ]);

    await db.addRole({
        title: roleData.title,
        salary: parseFloat(roleData.salary),
        departmentId: roleData.departmentId
    });
    console.log('New role added successfully.');
}

async function viewAllDepartments() {
    try {
        const departments = await db.viewAllDepartments(); // Displays all departments from the db. 
        console.table(departments);
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
}

async function addDepartment() {
    const departmentData = await inquirer.prompt([ // Prompts the user for the dept. name and adds it to the db. 
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new department:',
            validate: utils.notEmpty
        }
    ]);

    await db.addDepartment(departmentData);
    console.log('New department added successfully.');
}

  start().catch(err => console.error(err));
