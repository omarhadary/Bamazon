var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "hadary83",
	database: "Bamazon"
});
//connect to database
connection.connect(function(err) {
	if (err) throw err;
});
//function to display the 10 different products
var itemsForSale = function() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		console.log(JSON.stringify(res, null, 2));
		//prompt for user to select which item to buy is 
        // displayed 2 seconds after the products are listed
		setTimeout(startApp, 2000);
	});
};
//prompt user to decide if they want to make a purchase or exit the app
var startApp = function() {
	inquirer.prompt([{
		name: "start",
		type: "list",
		message: "Are you interested in making a purchase?",
		choices: ["Yes, I want to make a purchase.", "No thanks!"]
	}]).then(function(answer) {
		if (answer.start === "No thanks!") {
			return console.log("Hope to see you again soon.");
		} else {
			buyPrompt();
		}
	});
};
//function to prompt user to select which product they want to buy and quantity
var buyPrompt = function() {
	inquirer.prompt([{
		name: "product",
		type: "input",
		message: "What is the ID of the product you would like to buy?",
		validate: function(value) {
			var valid = parseFloat(value) < 11 && parseFloat(value) > 0;
			return valid || "Please enter a number between 1 and 10";
		},
		filter: Number
	}, {
		name: "quantity",
		type: "input",
		message: "How many would you like to buy?",
		validate: function(value) {
			var valid = !isNaN(parseFloat(value));
			return valid || "Please enter a number";
		},
		filter: Number
	}]).then(function(answer) {
		//check database using product ID entered by user against item_id column
		connection.query("SELECT * FROM products WHERE ?", {
			item_id: answer.product
		}, function(err, res) {
			//store the stock quantity left for the user selected product 
            // in order to update the stock count after the purchase
			var stockCount = res[0].stock_quantity;
			//calculates the total purchase cost of the product times 
            // the quantity to dispaly to user after they make the purchase
			var purchaseCost = res[0].price * answer.quantity;
			//checks if stock quantity is less than quantity user woud like to purchase, 
            // displays insufficient quantity message and runs the user prompt function 
            // to select another product or a different quantity
			if (res[0].stock_quantity < parseInt(answer.quantity)) {
				console.log("Insufficient quantity, only " + stockCount + " left!");
				setTimeout(startApp, 2000);
			} else {
				//if there is enough quantity, then reduce stock quantity by order quantity, 
                // display the total purchase cost and runs the app from the start by displaying 
                // the 10 products with the updated stock quantity
				connection.query("UPDATE products SET ? WHERE ?", [{
					stock_quantity: stockCount - answer.quantity
				}, {
					item_id: answer.product
				}], function(err, res) {
					console.log("Total cost of your purchase is $" + purchaseCost);
					setTimeout(itemsForSale, 3000);
				});
			}
		})
	});
};
itemsForSale();
