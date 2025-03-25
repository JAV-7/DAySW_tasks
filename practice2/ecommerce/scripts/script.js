const Product = require('./products');   
const ShoppingCart = require('./shopping_cart.js');
const DataHandler = require('./data_handler.js');

console.log("---------------------VERIFY------------------------");
console.log(DataHandler.getProducts());

// NEW PRODUCT
let newProduct = new Product(
    "Midnights",
    19,
    20,
    "https://th.bing.com/th/id/OIP.4JdNrQZEcyuuIqwjJHOL0wHaHa?rs=1&pid=ImgDetMain"
);

// ADD TO DATAHANDLER
console.log("---------------------ADD------------------------");
DataHandler.getProducts().push(newProduct);
console.log(DataHandler.getProducts());

// CART TEST
console.log("---------------------CREATE CART------------------------");
let cart = new ShoppingCart();
console.log("---------------------GET PRODUCTS------------------------");
let products = DataHandler.getProducts();

// ADD TO CART
cart.addItem(products[0], 5);

// UPDATE
console.log("---------------------UPDATE------------------------");
cart.updateItem(products[0].id, 13); 

// DELETE
console.log("---------------------DELETE------------------------");
cart.removeItem(products[0].id); 

