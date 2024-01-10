// Uses the mysql2 library for MySQL interactions.
const mysql = require('mysql2/promise');
//Created a DB class to handle it's operations.
class Database {
    // The constructor takes a configuration object for database connection.
    constructor(config) {
            this.config = config; // Stores the configuration. 
            this.connection = null; // Initializes the connection as null. 
    }
    // Initializes connection to the database. 
    async init() {
        // Only creates a connection if the connection doesn't already exist. 
            if (!this.connection) {
                this.connection = await mysql.createConnection(this.config);
            }
    }
    // Retrieves all employees data from the database. 
    async viewAllEmployees() {
        const query = 'SELECT * FROM employee'; // SQL query to select all employees from employees table in the database.
        const [rows] = await this.connection.execute(query); // Executes the query and retrieves the results. 
        return rows; // Returns all employees results. 
    }
    // Add a new employee to the db. 
    async addEmployee(employee) {
            // SQL query to insert a new employee record.
            const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)'; 
            const values = [employee.first_name, employee.last_name, employee.role_id, employee.manager_id]; // Values that need to be inserted. 
            try { 
                 // Executes the query with the provided values.
            const [result] = await this.connection.execute(query, values);
            return result; //Returns the result of adding the new employee. 
        } catch (error) {
            console.error('Error in addEmployee:', error); //Logs any errors. 
            throw error; // Throws the error. 
        }
    }
    // Update the employees role in the db. 
    async updateEmployeeRole(employeeId, roleId) {
        const query = 'UPDATE employee SET role_id = ? WHERE id = ?'; // SQL query to update an employee's role. 
        const [result] = await this.connection.execute(query, [roleId, employeeId]);  // Execute the query with role ID and employee ID.
        return result; //Returns the result of updating the employee. 
    }
    // Update an employee's manager in the database.
    async updateEmployeeManager(employeeId, managerId) { // SQL query to update an employee's manager. 
        const query = 'UPDATE employee SET manager_id = ? WHERE id = ?'; // Executes the query with manager id and employee id. 
        await this.connection.execute(query, [managerId, employeeId]); // Executes the query with manager id and employee id. 
        // No need to return the result since this function is only to execute an update operation. The display of the result will appear when you update the employees role. 
    }
    // Displays all roles from the db. 
    async viewAllRoles() {
        const query = 'SELECT * FROM role'; // SQL query to select all roles.
        const [rows] = await this.connection.execute(query); //Executes the query and then retieves the results. 
        return rows; // Returns the results.
    }
    // Adds a new role to the db. 
    async addRole(role) {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        const values = [role.title, role.salary, role.departmentId]; // Values that need to be inserted. 
        const [result] = await this.connection.execute(query, values); // Execute the query with the new values.
        return result; 
    }
    //Displays all departments from the db. 
    async viewAllDepartments() {
        const query = 'SELECT * FROM department';  // SQL query to select all departments.
        const [rows] = await this.connection.execute(query); // Execute the query and retrieve the results.
        return rows; // Returns a list of all departments. 
    }
    // Add a new department to the database.
    async addDepartment(department) {
        const query = 'INSERT INTO department (name) VALUES (?)'; // SQL query to insert a new department. 
        const [result] = await this.connection.execute(query, [department.name]); // Executes the query with the new depatment name. 
        return result;
    }
    
    // Closes the database connection. 
    async close() {
        await this.connection.end(); // Ends the connection. 
    }
}
// Export the Database class so it can be used in other files. 
module.exports = Database;
