var mysql=require("mysql")
var inquirer=require("inquirer")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user:"madeleinekemeny",
  password: "Jungyoon1",
  database: "bamazon_DB"
})


// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "shoppingCategories",
      type: "list",
      message: "Would you like to shop for [HOUSEWARES], [BOOKS], or [PET-SUPPLIES] on Bamazon?",
      choices: ["HOUSEWARES", "BOOKS", "PET-SUPPLIES", "EXIT"]
    })
    .then(function(answer) {
      console.log(answer)
      // based on their answer, either call the bid or the post functions
      if (answer.shoppingFor === "HOUSEWARES") {
        shopHousewares();
      }
      if(answer.shoppingFor === "BOOKS") {
        shopBooks();
      } 
      if(answer.shoppingFor === "PET-SUPPLIES") {
        shopPets();
      } 
      else{
        connection.end();
      }
    });
}

// function to handle items for sale in HOUSEWARES
function shopHousewares() {
  // prompt for info about the items available
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is ID of the item you would like purchase?"
      },
      
    ])
    .then(function(answer) {
      console.log(answer)
      // when finished prompting, use requests item from db 
      connection.query(
        "INSERT INTO shopping SET ?",
        {
          item_name: answer.item,
          category: answer.category,
          price: answer.price || 0,
          quantity: answer.squantity || 0
        },
        function(err) {
          if (err) throw err;
          console.log("Your item was selected successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

// function to handle items for sale in BOOKS
function shopBooks() {
  // prompt for info about the items available
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is ID of the item you would like purchase?"
      },
      
    ])
    .then(function(answer) {
      console.log(answer)
      // when finished prompting, use requests item from db 
      connection.query(
        "INSERT INTO shopping SET ?",
        {
          item_name: answer.item,
          category: answer.category,
          price: answer.price || 0,
          quantity: answer.squantity || 0
        },
        function(err) {
          if (err) throw err;
          console.log("Your item was selected successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

// function to handle items for sale in PETS
function shopPets() {
  // prompt for info about the items available
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is ID of the item you would like purchase?"
      },
      
    ])
    .then(function(answer) {
      console.log(answer)
      // when finished prompting, use requests item from db 
      connection.query(
        "INSERT INTO shopping SET ?",
        {
          item_name: answer.item,
          category: answer.category,
          price: answer.price || 0,
          quantity: answer.squantity || 0
        },
        function(err) {
          if (err) throw err;
          console.log("Your item was selected successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function selectItem() {
  // query the database for all items being sold
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they want to select
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
            }
            return choiceArray;
          },
          message: "Which item ID do you want to purchase?"
        },
        {
          name: "item",
          type: "input",
          message: "How many do you want to purchase?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if quantity exists
        if (chosenItem.highest_bid < parseInt(answer.bid)) {
          // quantity exists, so update db, let the user know, and start over
          connection.query(
            "UPDATE selections SET ? WHERE ?",
            [
              {
                quantity: answer.price
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Item selected successfully!");
              start();
            }
          );
        }
        else {
          // inventory wasn't high enough, so apologize and start over
          console.log("Your is selection is greater than the existing inventory. Try again...");
          start();
        }
      });
  });
}
