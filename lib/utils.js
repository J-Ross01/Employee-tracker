// Utility function to check if input is not empty.
function notEmpty(input) {
    // Trim whitespace from input and check if it's empty.
    return input.trim() !== '' ? true : 'This field cannot be empty.'; // Returns true if input is not empty, otherwise return an error message. 
}
// Utility function to format a list of employees for display.
function formatEmployeeList(employees) {
    // Map each employee in the array. 
    return employees.map(emp => ({ // Each employee will be formatted as an object with a first and last name and a value being their employee id. 
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id
    }));
}
// Formats a list of roles for display. 
function formatRoleList(roles) {
    // Map each role in the array.
    return roles.map(role => ({
        name: role.title,// Each role will be formatted as an object with a title and a value being the role id.  
        value: role.id
    }));
}
// Format a list of departments for display.
function formatDepartmentList(departments) {
    // Map each department in the array.
    return departments.map(dept => ({ // Each department will be formatted as an object with a dept. name and a value being the dept. id.  
        name: dept.name,
        value: dept.id
    }));
}
// Export the functions so they can be used in other files.
module.exports = {
    notEmpty,
    formatEmployeeList,
    formatRoleList,
    formatDepartmentList
};
