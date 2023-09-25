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
      type: '',
      name: '',
      message: '',
      choices: [],
    },
  ])