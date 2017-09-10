//require dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");
var colors = require("colors");

//setup connection object to mySQL database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "CYBERDYNEsystems!984",
	database: "bamazon_db"
});

//connect to mySQL database
connection.connect(function(err){
	if (err) throw err;
	
})

//gets inventory from database and displays it to customer
connection.query("SELECT * FROM products", function (err, res) {
	if (err) throw err;
	
	console.log( "Welecome to the store! Below you can see what we have available".red);
	for ( var i = 0; i < res.length; i++){
		 console.log("Item ID = " + res[i].item_id + " | " + res[i].product_name + " | " 
		 + "Department - " + res[i].department_name + " | " + "Price $ = " + res[i].price);
	}
	
	shop();
});


//shop function
function shop(){
	inquirer.prompt([
		{
			type: "input",
			message: "Please enter the item ID number of the product you'd like to purchase",
			name: "id"
        },  
        {
        	type: "input",
            message: "How many would you like to purchase?".red,
            name: "quantity"
        }

    ]).then(function(answer) {
    	var query = "SELECT stock_quantity, price FROM products WHERE ?"
          	
        connection.query(query, { item_id: answer.id }, function(err, res) {
        	//updates stock amounts based on what customer purchases as long as there is enough in stock
            if (res[0].stock_quantity >= answer.quantity) {

	            var adjustedQuantity = res[0].stock_quantity - answer.quantity;
	            var purchasePrice = (answer.quantity * res[0].price);

	            var query2 = " UPDATE products SET ? WHERE ?";
	            
	            connection.query(query2, [{ stock_quantity: adjustedQuantity }, { item_id: answer.id }],

	            //shows customer total
	            function(err, res) {
	                if (err) throw err;
	                console.log("Success! Your total is $" + purchasePrice);

	                //asks customer if they would like to continue shopping
	                //if yes, run shop() again and if not, customer gets a farewell message and app closes
	                //if not, then print a farewell message
	                inquirer.prompt([
	                	{	
	                		type: "confirm",
	                		message: "Would you like to continue shopping?",
	                		name: "continue"
	                	}
	                ]).then(function(confirm) {
	                	if(confirm.continue) shop();
	                	else {
	                		console.log("Thanks for stopping by");
	                		process.exit(0);
	                	}
	                }) 
                });
        	}
        	//show a message if customer tries to buy too many of an item
        	else{
        		console.log("I'm sorry. We don't have enough to fulfill your order at this time");
        		shop();
       
        	}
        })        	
	});
	
}

