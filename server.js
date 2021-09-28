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
      addDepartment();
    }
    if(choice === "Add Role" ){
      addRole();
    }
    if(choice === "Add Employee" ){
      addEmployee();
    }
    if(choice === "Update Employee Role" ){
      updateRole();
    }
  });
};

// view all departments -- chalk and console.table
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



// view all roles 
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


// view all employees 
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


// add a department
const addDepartment = () => {
  inquirer.prompt({
    name: 'department',
    type: 'input',
    message: "What name do you want to give this new department?"
  })
  .then(function(answer) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    db.query(sql, answer.department, function(err, res) {
      if (err) throw err;
      console.log(chalk.yellow.bold(`====================================================================================`));
      console.log(`                              ` + chalk.green.bold(`New Department Added:`));
      console.log(chalk.yellow.bold(`====================================================================================`));
      console.log(`${(answer.department).toUpperCase()}.`);
      console.log(chalk.yellow.bold(`====================================================================================`));
      viewAllDepartments();
    })
  })
}

//add role 

const addRole = async () => {
  try {
    let departments = await db.query("SELECT * FROM department");
    let answer = await inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: "What is the new role's title?"
      },
      {
        name: 'salary',
        type: 'input',
        message: "What is the new role's salary?"
      },
      {
        name: 'departmentID',
        type: 'list',
        choices: departments.map((departmentID) => {
          return {
            name: departmentID.department_name,
            value: departmentID.id
          }
        }),
        message: "Pick a department to oversee this role:",
      }
    ]);

    let pickedDept;
    for (i = 0; i < departments.length; i++){
      if (departments[i].department_id === answer.choice) {
        pickedDept = departments[i];
      };
    }

    let result = await connection.query("INSERT INTO role SET ?", {
      title: answer.title,
      salary: answer.salary,
      department_id: answer.departmentID
    })

    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`                              ` + chalk.green.bold(`New Role Added:`));
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`${(answer.title)}`);
    console.log(chalk.yellow.bold(`====================================================================================`));
    viewAllRoles();
  }  catch (err) {
    console.log(err);
    viewAllRoles();
  };
}


// add an employee 
const addEmployee = async () => {
  try {
    let managers = await db.query("SELECT * FROM employee");
    let roles = await db.query("SELECT * FROM employee_role");
    let answer = await inquirer.prompt([
      {
        name: 'firstName',
        type: 'input',
        message: "What is the new employee's first name?"
      },
      {
        name: 'lastName',
        type: 'input',
        message: "What is the new employee's last name?"
      },
      {
        name: 'employeeRoleID',
        type: 'list',
        choices: roles.map((employeeRoleID) => {
          return {
            name: employeeRoleID.title,
            value: employeeRoleID.id
          }
        }),
        message: "Pick this new employee's role ID:",
      },
      {
        name: 'employeeManagerID',
        type: 'list',
        choices: managers.map((employeeManagerID) => {
          return {
            name: employeeManagerID.first_name + ' ' + employeeManagerID.last_name,
            value: employeeManagerID.id
          }
        }),
        message: "Pick a manager to oversee this new employee:",
      }
    ]);

    let result = await connection.query("INSERT INTO employee SET ?", {
      first_name: answer.firstName,
      last_name: answer.lastName,
      role_id: (answer.employeeRoleID),
      manager_id: (answer.employeeManagerID)
    });

    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`                              ` + chalk.green.bold(`New Employee Added:`));
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`Welcome ${(answer.firstName)} ${(answer.lastName)}!`);
    console.log(chalk.yellow.bold(`====================================================================================`));
    viewAllEmployees();

  }  catch (err) {
    console.log(err);
    viewAllEmployees();
  };
}

// update employee role 
const updateRole = async () => {
  try {
    let employees = await connection.query("SELECT * FROM employee");
    let pickEmployee = await inquirer.prompt([
      {
        name: 'employee',
        type: 'list',
        choices: employees.map((thisEmployee) => {
          return {
            name: thisEmployee.first_name + ' ' + thisEmployee.last_name,
            value: thisEmployee.id
          }
        }),
        message: "Pick an existing employee to update their role:"
      }
    ]);

    let roles = await connection.query("SELECT * FROM role");
    let pickRole = await inquirer.prompt([
      {
        name: 'role',
        type: 'list',
        choices: roles.map((thisRole) => {
          return {
            name: thisRole.title,
            value: thisRole.id
          }
        }),
        message: "Pick a new role for this employee:"
      }
    ]);

    let result = await connection.query("UPDATE employee SET ? WHERE ?", [
      {role_id: pickRole.role},
      {id: pickEmployee.employee}
    ]);

    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`                              ` + chalk.green.bold(`Employee Role Updated:`));
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`Employee ID ${(pickEmployee.employee)} has new role ID ${(pickRole.role)}`);
    console.log(chalk.yellow.bold(`====================================================================================`));
    viewAllEmployees();

  }  catch (err) {
    console.log(err);
    viewAllEmployees();
  };
}



promptUser();