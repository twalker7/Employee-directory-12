const inquirer = require('inquirer');
const mysql = require('mysql2');

const cTable = require('console.table');
const chalk = require('chalk');

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

    if(choice === "View All Roles" ){
      viewAllRoles();
    }
    if(choice === "View All Employees" ){
      viewAllEmployees();
    }
    if(choice === "Add Department" ){
      viewAllDepartments();
    }
    if(choice === "Add Role" ){
      viewAllDepartments();
    }
    if(choice === "Add Employee" ){
      viewAllDepartments();
    }
    if(choice === "Update Employee Role" ){
      viewAllDepartments();
    }
  });
};
/*
const viewAllDepartments = ()=>{
  console.log("all departments");
  const sql =   `SELECT * FROM department`;
  db.query(sql, (err, res)=>{
    if(err){throw err;}
  });
} 

*/

//view all departments -- chalk and console.table
const viewAllDepartments = async () => {
  console.log(chalk.yellow.bold(`====================================================================================`));
  console.log(`                              ` + chalk.green.bold(`All Departments:`));
  console.log(chalk.yellow.bold(`====================================================================================`));   
  try{
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
      if (err) throw err;
      let departmentArr = [];
      res.forEach(department => departmentArr.push(department));
      console.table(departmentArr);
      console.log(chalk.yellow.bold(`====================================================================================`));
      promptUser();
    });
  } catch (err) {
    console.log(err);
    promptUser();
  }
};  



//view all roles 
const viewAllRoles = () => {
  console.log(chalk.yellow.bold(`====================================================================================`));
  console.log(`                              ` + chalk.green.bold(`All Roles:`));
  console.log(chalk.yellow.bold(`====================================================================================`));   
  try{
    const sql = `SELECT * FROM employee_role`;
    db.query(sql, (err, res) => {
      if (err) throw err;
      res.forEach(role => {
        console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
      })
      promptUser();
    })
  } catch (err) {
    console.log(err);
    promptUser();
  }
};  


//view all employees 
const viewAllEmployees = () => {
  console.log(chalk.yellow.bold(`====================================================================================`));
  console.log(`                              ` + chalk.green.bold(`All Employees:`));
  console.log(chalk.yellow.bold(`====================================================================================`));   
  try{
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, res) => {
      if (err) throw err;
      let employeeArr = [];
      res.forEach(employee => employeeArr.push(employee));
      console.table(employeeArr);
      console.log(chalk.yellow.bold(`====================================================================================`));
      promptUser();
    });
  } catch (err) {
    console.log(err);
    promptUser();
  }
};  

promptUser();
