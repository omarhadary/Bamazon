var inquirer = require ("inquirer");
var mysql = require ("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user:"root",
    password: "hadary83",
    database: "Bamazon"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id "+connection.threadId);
});

var itemsForSale = function() {
    connection.query("SELECT * FROM products", function (err, res) {
        if(err) throw err;
        console.log(JSON.stringify(res, null, 2));
        setTimeout(buyPromprt, 2000);
    });
};
var buyPromprt = function() {
    inquirer.prompt([{
        name: "product",
        type: "input",
        message: "What is the ID of the product you would like to buy?",
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Please enter a number between 1 and 10";
        },
        filter: Number
    } , {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?",
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Please enter a number";
        },
        filter: Number
    }]).then(function(answer) {
        console.log("answers");
    });
};
itemsForSale();