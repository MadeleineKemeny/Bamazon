var mysql = require("mysql")
var inquirer = require("inquirer")
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "madeleinekemeny",
  password: "Jungyoon1",
  database: "bamazon_DB"
})


// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  //console.log("id ", connection.threadId)
  // run the start function after the connection is made to prompt the user
  start();
});




function start() {
  // query the database for all items being sold
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    console.log("\n")
    console.table(results);

    // dsiplay table "products", prompt the user for order selections
    inquirer
      .prompt([
        {
          name: "itemid",
          type: "number",
          validate: function (value) {
            if (isNaN(value) === false)
              return true;
            else
              return false;
          },
          message: "Which item ID (the number at the beginning of the row) are you purchasing? "
        },
        {
          name: "quantity",
          type: "input",
          message: "How many are you purchasing today?",
          validate: function (value) {
            if (isNaN(value) === false)
              return true;
            else
              return false;
          }
        }
      ])
      .then(function (answer) {
       
        connection.query("SELECT * FROM products WHERE id= ?", [answer.itemid], function (err, results) {
          if (err) throw err;
        
          // determine if quantity exists
          if (results[0].quantity  >= parseInt(answer.quantity)) {
            // if quantity exists, then update db (math below), let the user know order was successful, and start over
            var newStock = results[0].quantity  - parseInt(answer.quantity);
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  quantity: newStock
                },
                {
                  id:  answer.itemid
                }
              ],
              function (error, res) {
                if (error) throw err;
                console.log("\n" + "Your order has been placed! The total price: ", Number((parseInt(answer.quantity)).toFixed(2)* results[0].price));
                // call ask if want more
                orderMore();
              }
            );
          }
          else {
            //  if quantity doesn't exist, start over
            console.log("\n" + "Your desired quantity is greater than the existing inventory. Please try again.");
            start();
          }
        })


      });
  });
}

// more inquirer... does the client wish to continue shoping: if yes, call start; if no, stop and close connection and application
function orderMore(){

  inquirer
  .prompt([
    {
      name: "want",
      type: "list",
      choices: ["Y", "N"],
      message: "\n" + "Are there other items you want to add to this order?"
    }  
  ])
  .then(function (res) {
    if (res.want === "Y"){
      start()
    }
    else{
      console.log("\n" + "Thanks for shopping Bamazon! An email updating your order status will arrive shortly.");
      connection.end()
      process.exit()
    }

  })

}