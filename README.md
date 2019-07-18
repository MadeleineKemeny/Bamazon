# Bamazon: https://youtu.be/IyNe3KsyiAI

## Bamazon: bamazonBasic.js
This is a client-side node application to replicate an online storefron with real-time inventory. The features it currently allows by the user are:

1. selecting a product for sale from a pre-written SQL database; the product is detailed with an ID, item name, price, and quantity in stock
2. indicating the quantity desired based on availability
3. verifying that the order was placed
4. continue to shop after each item selected is recorded/ordered and subtracted from available inventory or exit the application

The data is displayed in a table. The prompts appear in the terminal and the up/down arrow keys are used to navigate the menu of possible actions for the user. The inventory updates as the user inputs her choices. The price is calculated to two decimal places.

## Bamazon: bamazonmgr.js
This version of bamazon is used by the employee of Bamazon to:
1. view products for sale
2. view products that are considered "low inventory"; fewer than 5 in stock
3. add to/restock existing products for sale
4. add new products for sale

The data is displayed in a table. The prompts appear in the terminal and the up/down arrow keys are used to navigate the menu of possible actions for the employee. When "low inventory" is checked, products with fewer than 5 items in inventory are displayed; when the employee chooses "add to inventory" the table updates and can be checked (by displaying low inventory, the formerly "low inventory" item will have disappeared). Additionally, the employee can add new items and all relevant data: category/price/quantity in inventory to the database. It will appear when the employee opts to "view products for sale."

There are several dependencies used in these applications: mysql for initial database of products on offer; inquirer for both user and employee prompts; and cTable to format the display in the terminal. Node.JS is used to run the application.

Thank you to Philip Loy, Eran Dromy, and Isabel Arcones for explaining the concepts of schema, seeds, and writing the syntax logic for the node script.
