// Required packages
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Carmella07*',
  database: 'employees_db'
});

// Connect to the database
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the database.');
  startApplication();
});

// Start the application
function startApplication() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        message: 'Select an option:',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      }
    ])
    .then(answer => {
      switch (answer.option) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          connection.end();
          console.log('Application closed.');
          break;
        default:
          console.log('Invalid option. Please try again.');
          startApplication();
          break;
      }
    });
}

// Function to view all departments
function viewAllDepartments() {
  const query = 'SELECT * FROM department';

  connection.query(query, (err, res) => {
    if (err) throw err;

    console.table(res);

    startApplication();
  });
}

// Function to view all roles
function viewAllRoles() {
  const query = 'SELECT * FROM role';

  connection.query(query, (err, res) => {
    if (err) throw err;

    console.table(res);

    startApplication();
  });
}

// Function to view all employees
function viewAllEmployees() {
  const query = 'SELECT * FROM employee';

  connection.query(query, (err, res) => {
    if (err) throw err;

    console.table(res);

    startApplication();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:'
      }
    ])
    .then(answer => {
      const query = 'INSERT INTO department (department_name) VALUES (?)';
      const values = [answer.departmentName];

      connection.query(query, values, err => {
        if (err) throw err;

        console.log('Department added successfully.');

        startApplication();
      });
    });
}

// Function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleTitle',
        message: 'Enter the title of the role:'
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter the salary for the role:'
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for the role:'
    }
  ])
  .then(answer => {
    const query = 'INSERT INTO roles (role_title, role_salary, department_id) VALUES (?, ?, ?)';
    const values = [answer.roleTitle, answer.roleSalary, answer.departmentId];

    connection.query(query, values, err => {
      if (err) throw err;

      console.log('Role added successfully.');

      startApplication();
    });
  });
}

// Function to add an employee
function addEmployee() {
inquirer
  .prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the employee:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the employee:'
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the role ID for the employee:'
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'Enter the manager ID for the employee:'
    }
  ])
  .then(answer => {
    const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    const values = [answer.firstName, answer.lastName, answer.roleId, answer.managerId];

    connection.query(query, values, err => {
      if (err) throw err;

      console.log('Employee added successfully.');

      startApplication();
    });
  });
}

// Function to update an employee's role
function updateEmployeeRole() {
// Fetching existing employees to choose from
connection.query('SELECT * FROM employees', (err, employees) => {
  if (err) throw err;

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee to update:',
        choices: employees.map(employee => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        }))
      },
      {
        type: 'input',
        name: 'newRoleId',
        message: 'Enter the new role ID for the employee:'
      }
    ])
    .then(answer => {
      const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
      const values = [answer.newRoleId, answer.employeeId];

      connection.query(query, values, err => {
        if (err) throw err;

        console.log('Employee role updated successfully.');

        startApplication();
      });
    });
});
}
