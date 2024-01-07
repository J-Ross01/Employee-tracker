function notEmpty(input) {
    return input.trim() !== '' ? true : 'This field cannot be empty.';
}

function formatEmployeeList(employees) {
    return employees.map(emp => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id
    }));
}

function formatRoleList(roles) {
    return roles.map(role => ({
        name: role.title,
        value: role.id
    }));
}

function formatDepartmentList(departments) {
    return departments.map(dept => ({
        name: dept.name,
        value: dept.id
    }));
}

module.exports = {
    notEmpty,
    formatEmployeeList,
    formatRoleList,
    formatDepartmentList
};
