var inquirer = require ("inquirer");
var mysql = require ("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user:"root",
    password: "hadary83"
    database: "Bamazon"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id "+connection.threadId);
});

var appStart = function() {
    inquirer.prompt({

    }).then(function(answer) {

    });
};