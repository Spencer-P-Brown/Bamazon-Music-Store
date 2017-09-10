# Bamazon-Music-Store

This is a command line Node app that uses a mySQL database to manage inventory. There is a customer.js that is for purchasing products and in doing so, reducing the stock reflected in the database. There is also a manager.js which allows users to add products, order additional inventory of existing products and view products with low stock.

## Instructions

NOTE: You will need mySQL workbench installed and configured for this app to work. You can find mySQL Workbench [here](https://www.mysql.com/products/workbench/).

1. Clone the Repo.
2. In your command line navigate to the Bamazon-Music-Store repo and then run npm install to install all the dependencies
3. In mySQL workbench copy and paste the commands found in the bamazon.sql file (this creates your DB and fills your tables with data)
4. In the customer.js and manager.js you will need to fill in your password in the connection object. You might also have to adjust some of the other values depending on how you configured your mySQL database. 
5. In command line navigate to the Bamazon-Music-Store repository and run either "node customer.js" to shop or "node manager.js" to manage inventory and order new products.
