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

//main manager function, will be able to choose from several different tasks

function taskList(){
	//will ask customer what they want to do
	//view all products, view low inventory products, Add to inventory, add new product or log out
}