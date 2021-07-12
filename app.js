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
    sex: 'f'
  }
]);

// Connect to the company database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: '723mysql',
      database: 'company'
    },
    console.log('Connected to the company database.')
  );

