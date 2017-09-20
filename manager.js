//require dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");
var colors = require("colors");

//connection to mySQL database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "CYBERDYNEsystems!984",
	database: "bamazon_db"
});

connection.connect(function(err){
	if (err) throw err;

	else{
		console.log("asdfasdf");
	}
});

//View all products function
function viewProduct(){
	connection.query("SELECT * FROM products", function (err, res){
		if (err) console.log(err);
		else{
		//iterates through each row in db printing pertinent info
			for (var i = 0; i < res.length; i++){
				console.log("Item ID = " + res[i].item_id + " | " + res[i].product_name + " | " 
			 			+ "Department - " + res[i].department_name + " | " + "In Stock:" + res[i].stock_quantity);
			}

			taskList();
		}
	})
		
}

//View products with 5 or less units in stock
function lowInv(){
	connection.query("SELECT item_id, product_name, department_name, stock_quantity FROM products WHERE stock_quantity < 6",
		function(err, res){
			if (err) console.log(err);
			else{
				console.log(res);

				for (var i = 0; i < res.length; i++){
					console.log("Item ID = " + res[i].item_id + " | " + res[i].product_name + " | " 
						+ "Department" + res[i].department_name + " | " + "Stock Quantity: " + res[i].stock_quantity);
			}

			taskList();
		}
	})
}

function restock() {
	inquirer.prompt([
		{
			type: "input",
			message: "What is the Item ID of the product you would like to stock?",
			name: "id"
		},
		{
			type: "input",
			message: "How many more units would you like to order?",
			name: "order"
		}
	]).then(function(answers){
		connection.query("SELECT item_id, stock_quantity FROM products WHERE ?",
		{item_id: answers.id}, function(err, res){
			if (err) console.log(err);
			var newStock = res[0].stock_quantity + parseInt(answers.order);
					
			connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newStock}, {item_id: answers.id}],
			function(err, res){
				if (err) console.log(err);
				console.log("Item ID :" + answers.id + " now has " + newStock + " units in stock!");
				taskList();
			})
		})	
	})
}
//main manager function, will be able to choose from several different tasks

function taskList() {
	inquirer.prompt([
		{
			type: "list",
			message: "What would you like to do?",
			choices: ["View Products", "View Low Inventory", "Add Inventory to Existing Product", "Add New Product", "Logout"],
			name: "task"
		}
	]).then(function(answer) {
		if(answer.task == "View Products") {
			viewProduct();
		}
		else if(answer.task == "View Low Inventory") {
			lowInv();
		}
		
		else if(answer.task == "Add Inventory to Existing Product") {
			restock();
		}
		else{
			console.log("that is not a valid entry at this time");
		}
	});
	//will ask customer what they want to do
	// Add to inventory, add new product or log out
}


taskList()