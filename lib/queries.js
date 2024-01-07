const mysql = require('mysql2/promise');

class Database {
    constructor(config) {
            this.config = config;
            this.connection = null;
    }

    async init() {
            if (!this.connection) {
                this.connection = await mysql.createConnection(this.config);
            }
    }

    async viewAllEmployees() {
        const query = 'SELECT * FROM employee';
        const [rows] = await this.connection.execute(query);
        return rows;
    }
    
    async addEmployee(employee) {
            const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
            const values = [employee.first_name, employee.last_name, employee.role_id, employee.manager_id];
            try {
            const [result] = await this.connection.execute(query, values);
            return result;
        } catch (error) {
            console.error('Error in addEmployee:', error);
            throw error;
        }
    }
    
    async updateEmployeeRole(employeeId, roleId) {
        const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
        const [result] = await this.connection.execute(query, [roleId, employeeId]);
        return result;
    }

    async updateEmployeeManager(employeeId, managerId) {
        const query = 'UPDATE employee SET manager_id = ? WHERE id = ?';
        await this.connection.execute(query, [managerId, employeeId]);
    }

    async viewAllRoles() {
        const query = 'SELECT * FROM role';
        const [rows] = await this.connection.execute(query);
        return rows;
    }

    async addRole(role) {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        const values = [role.title, role.salary, role.departmentId];
        const [result] = await this.connection.execute(query, values);
        return result;
    }
     

    async viewAllDepartments() {
        const query = 'SELECT * FROM department';
        const [rows] = await this.connection.execute(query);
        return rows;
    }

    async addDepartment(department) {
        const query = 'INSERT INTO department (name) VALUES (?)';
        const [result] = await this.connection.execute(query, [department.name]);
        return result;
    }
    

    async close() {
        await this.connection.end();
    }
}

module.exports = Database;
