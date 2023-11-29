const inquirer = require('inquirer');
const connection = require('./connections'); 


// Function to start the application
function startApp() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'Select an action!',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
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
          break;
      }
    });
}


function viewDepartments() {
  //  SQL query to view departments
  const query = 'SELECT * FROM departments';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res); 
    startApp();
  });
}

function viewRoles() {
  // SQL query to view roles
  const query = 'SELECT * FROM roles';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res); 
    startApp();
  });
}

function viewEmployees() {
  //  SQL query to view employees
  const query = 'SELECT * FROM employees';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res); 
    startApp();
  });
}

function addDepartment() {
  // Inquirer prompt to get department name
  inquirer
  .prompt({
    name: 'departmentName',
    type: 'input',
    message: 'Enter the name of the department:',
    validate: (input) => {
      if (input.trim() !== '') {
        return true;
      } else {
        return 'Please enter a department name.';
      }
    },
  })
  .then((answer) => {
    const query = 'INSERT INTO departments (department_name) VALUES (?)';

    connection.query(query, [answer.departmentName], (err, res) => {
      if (err) throw err;

      console.log(`\nDepartment '${answer.departmentName}' added successfully.\n`);

      
      startApp();
    });
  });
  
}

function addRole() {
  inquirer
    .prompt([
      {
        name: 'roleName',
        type: 'input',
        message: 'Enter the name of the role:',
        validate: (input) => {
          if (input.trim() !== '') {
            return true;
          } else {
            return 'Please enter a role name.';
          }
        },
      },
      {
        name: 'roleSalary',
        type: 'input',
        message: 'Enter the salary for the role:',
        validate: (input) => {
          if (!isNaN(input) && parseFloat(input) >= 0) {
            return true;
          } else {
            return 'Please enter a valid salary.';
          }
        },
      },
    ])
    .then((answer) => {
      const query = 'INSERT INTO roles (title, salary) VALUES (?, ?)';

      connection.query(query, [answer.roleName, answer.roleSalary], (err, res) => {
        if (err) throw err;

        console.log(`\nRole '${answer.roleName}' added successfully.\n`);

        startApp();
      });
    });
}

function addEmployee() {
  // Inquirer prompt to get employee details
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'Enter the first name of the employee:',
        validate: (input) => {
          if (input.trim() !== '') {
            return true;
          } else {
            return 'Please enter a first name.';
          }
        },
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'Enter the last name of the employee:',
        validate: (input) => {
          if (input.trim() !== '') {
            return true;
          } else {
            return 'Please enter a last name.';
          }
        },
      },
    ])
    .then((answer) => {
      const query = 'INSERT INTO employees (first_name, last_name) VALUES (?, ?)';

      connection.query(query, [answer.firstName, answer.lastName], (err, res) => {
        if (err) throw err;

        console.log(`\nEmployee '${answer.firstName} ${answer.lastName}' added successfully.\n`);

        startApp();
      });
    });
}


function updateEmployeeRole() {

  const employeeQuery = 'SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employees';

  connection.query(employeeQuery, (err, employees) => {
    if (err) throw err;

  
    inquirer
      .prompt({
        name: 'employeeId',
        type: 'list',
        message: 'Select an employee to update:',
        choices: employees.map((employee) => ({
          name: employee.full_name,
          value: employee.id,
        })),
      })
      .then((employeeAnswer) => {
        // Inquirer prompt to enter a new role
        inquirer
          .prompt({
            name: 'newRoleId',
            type: 'input',
            message: 'Enter the new role ID for the selected employee:',
            validate: (input) => {
              const isValid = !isNaN(input) && input.trim() !== '';
              return isValid || 'Please enter a valid role ID.';
            },
          })
          .then((roleAnswer) => {
            // Update the employee's role in the database
            const updateQuery = 'UPDATE employees SET role_id = ? WHERE id = ?';

            connection.query(updateQuery, [roleAnswer.newRoleId, employeeAnswer.employeeId], (err, res) => {
              if (err) throw err;

              console.log('\nEmployee role updated successfully.\n');

             
              startApp();
            });
          });
      });
  });

}

startApp();
