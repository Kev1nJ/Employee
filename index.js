const inquirer = require('inquirer');
const db = require('./connections'); 

// Function to perform database queries
function performQuery(query, values) {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// inquierer prompts
inquirer
  .prompt([
  {
    type: 'list',
    name: 'action',
    message: 'Select an action.',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department' , 'Add a role' , 'Add an employee', 'Update an employee role'],
  },
])
