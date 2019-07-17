DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  category VARCHAR(45) NOT NULL,
  item_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NULL,
  quantity INT default 0,
  PRIMARY KEY (id)
);


-- HOUSEWARES
INSERT INTO products (category, item_name, price, quantity)
VALUES ("HOUSEWARES", "broom", 14.99, 50);

INSERT INTO products (category, item_name, price, quantity)
VALUES ("HOUSEWARES", "tissues", 3.39, 100);

INSERT INTO products (category, item_name, price, quantity)
VALUES ("HOUSEWARES", "stock pot", 145.99, 10);

INSERT INTO products (category, item_name, price, quantity)
VALUES ("HOUSEWARES", "mini fridge", 99.99, 5);


-- BOOKS
INSERT INTO products (category, item_name, price, quantity)
VALUES ("BOOKS", "Dracula", 14.99, 15);

INSERT INTO products (category, item_name, price, quantity)
VALUES ("BOOKS", "Pale Fire", 25.00, 5);

INSERT INTO products (category, item_name, price, quantity)
VALUES ("BOOKS", "The Little Prince", 15.99, 10);

INSERT INTO products (category, item_name, price, quantity)
VALUES ("BOOKS", "Wuthering Heights", 18.00, 25);


-- PET SUPPLIES
INSERT INTO products (category, item_name, price, quantity)
VALUES ("PET-SUPPLIES", "32-Pack Greenies", 24.99, 15);

INSERT INTO products (category, item_name, price, quantity)
VALUES ("PET-SUPPLIES", "Science Diet Senior Small Bites", 34.99, 25);

INSERT INTO products (category, item_name, price, quantity)
VALUES ("PET-SUPPLIES", "Ivermectin", 45.99, 10);

INSERT INTO products (category, item_name, price, quantity)
VALUES ("PET-SUPPLIES", "Paw Protect", 6.99, 20);