const inquirer = require('inquirer');
const mysql = require('mysql2');

const cTable = require('console.table');

//test/demonstrate .table() functionality 
console.table([
  {
    name: 'foo',
    age: 10,
    sex: 'm'
  }, {
    name: 'bar',
    age: 20,
    sex: 'sausin'
  }
]);

// Connect to the company database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: '777mysql',
      database: 'company'
    },
    console.log('Connected to the company database.')
  );

//menu prompt
const promptUser = ()=>{
  inquirer.prompt([
    { type: 'list',
      name: "menu",
      message: "what would you like to do?",
      choices: [
        "View All Departments", 
        "View All Roles", 
        "View All Employees", 
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role"
      ]
    }
  ])
  .then((answer)=>{
    const choice = answer.menu;
    if(choice === "View All Departments" ){
      viewAllDepartments();
    }
  });
};

const viewAllDepartments = ()=> console.log("hello");

promptUser();
