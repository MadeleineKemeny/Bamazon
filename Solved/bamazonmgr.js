var mysql = require("mysql")
var inquirer = require("inquirer")
const cTable = require('console.table');

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
    console.log("id ", connection.threadId)
    // run the start function after the connection is made to prompt the user
    menu();
});

// function which prompts the user for what action they should take
function menu() {

    inquirer
        .prompt([
            {
                name: "menu",
                type: "list",
                choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product", "Exit"],

                message: "\n" + "Which task are you performing?"
            }
        ])
        .then(function (res) {
            switch (res.menu) {
                case ("View Products For Sale"):
                    viewInventory();
                    break;

                case ("View Low Inventory"):
                    lowInventory();
                    break;

                case ("Add To Inventory"):
                    addInventory();
                    break;

                case ("Add New Product"):
                    newItem();
                    break;

                case ("Exit"):
                    end();
                    break;

            }

        })
}

function viewInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("\n")
        console.table(results);
        menu()
    })
}

function lowInventory() {
    connection.query("SELECT * FROM products where quantity < 5", function (err, results) {
        if (err) throw err;
        console.log("\n")
        console.table(results);
        menu()
    })
}

function addInventory() {
    // add (order) user-defined quantity to item_name; then update

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
                message: "Enter the item ID to add inventory: "
            },
            {
                name: "quantity",
                type: "input",
                message: "Enter quantity to add to this item: ",
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

                var newStock = results[0].quantity + parseInt(answer.quantity);
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            quantity: newStock
                        },
                        {
                            id: answer.itemid
                        }
                    ],
                    function (error, res) {
                        if (error) throw err;
                        console.log("\n" + "Items were added. Restock was successful!");
                        // call ask if want more
                        menu();
                    }
                );


            })


        });
}

function newItem() {

    // inquirer to request item_name/category/price/quantity; then insert row

    inquirer
        .prompt([
            {
                name: "item_name",
                type: "input",
                message: "Enter the name of the new product to sell: ",
                validate: function (value) {
                    if (value === "")
                      return false;
                    else
                      return true;
                  },
            },
            {
                name: "category",
                type: "input",
                validate: function (value) {
                    if (value === "")
                      return false;
                    else
                      return true;
                  },
                message: "Enter a category for the new product, ex: MOVIES: "
            },
            {
                name: "price",
                type: "input",
              
                message: "Enter the price of the new product: "
            },
            {
                name: "quantity",
                type: "input",
                message: "Enter quantity to add to this item: ",
                // validate: function (value) {
                //     if (isNaN(value) === false)
                //         return true;
                //     else
                //         return false;
                // }
            }
        ])
        .then(function (answer) {

            connection.query("INSERT INTO products SET ?",
                {
                    item_name: answer.item_name,
                    category: answer.category,
                    price: answer.price || 0,
                    quantity: answer.quantity || 0
                },
                function (error, res) {
                    if (error) {
                        console.log(error)
                    }
                    else{
                    console.log("\n" + "New item was added successfully!");
                    // call ask if want more
                    menu();
                    }
                }
            );


        })



}



function end() {


    console.log("\n" + "Thank you for your hard work today!");
    connection.end()
    process.exit()


}