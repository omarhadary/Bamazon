# Bamazon

This is an Amazon-like storefront which takes orders from customers and depletes stock in the store's inventory.

A database is created to store the inventory and includes 10 different products with columns to store:
  - Product unique ID
  - Product name
  - Department name
  - Product Price
  - Count of quantity left in stock 

> All user experience is through the terminal and updated to the local database. 

### Demo

A video walkthough can be found here https://youtu.be/jT2KbI3Oas4

### Tech

Bamazon uses open source tools:

* [node.js]
* [MYSQL]
* [MYSQL Workbench]
* [npm inquirer]
* [npm mysql]

### Installation

Bamazon requires [Node.js](https://nodejs.org/) to run.

Install the dependencies.

```sh
$ npm install
$ node app
```

[node.js]: <http://nodejs.org>
[MYSQL]: <https://www.mysql.com/>
[MYSQL Workbench]: <http://www.mysql.com/products/workbench/>
[npm inquirer]: <https://www.npmjs.com/package/inquirer>
[npm mysql]: <https://www.npmjs.com/package/mysql>
