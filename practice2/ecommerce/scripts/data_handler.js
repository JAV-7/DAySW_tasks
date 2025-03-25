/**
 * Importing the Product class.
 */
import Product from './product.js';

/**
 * Array to store the list of products.
 */
let products = [];

/**
 * Retrieves all products.
 * @returns {Product[]} List of all products.
 */
function getProducts() {
    return products;
}

/**
 * Retrieves a product by its ID.
 * @param {string} id - The ID of the product.
 * @returns {Product|null} The product if found, otherwise null.
 */
function getProductById(id) {
    return products.find(product => product.id === id) || null;
}

/**
 * Creates a new product and adds it to the list.
 * @param {Object} product - The product data.
 * @param {string} product.name - The name of the product.
 * @param {number} product.price - The price of the product.
 * @param {number} product.stock - The stock quantity.
 * @param {string} product.image - The image URL.
 * @returns {Product} The created product.
 * @throws {Error} If product data is invalid.
 */
function createProduct(product) {
    if (!product || typeof product.name !== "string" || Number.isNaN(product.price) || Number.isNaN(product.stock) || typeof product.image !== "string") {
        throw new Error("Not valid info");
    }
    const newP = new Product(
        product.name,
        product.price,
        product.stock,
        product.image
    );
    products.push(newP);
    return newP;
}

/**
 * Updates an existing product by its ID.
 * @param {string} id - The ID of the product to update.
 * @param {Object} updateP - The properties to update.
 * @throws {Error} If the product ID is invalid.
 */
function updateProduct(id, updateP) {
    const i = products.findIndex(product => product.id === id);
    if (i < 0) { throw new Error("Invalid ID"); }
    let product = products[i];

    if (updateP.name) product.name = updateP.name;
    if (updateP.stock) product.stock = updateP.stock;
    if (updateP.price) product.price = updateP.price;
    if (updateP.image) product.image = updateP.image;
}

/**
 * Deletes a product by its ID.
 * @param {string} id - The ID of the product to delete.
 * @throws {Error} If the product is not found.
 */
function deleteProduct(id) {
    const i = products.findIndex(product => product.id === id);
    if (i < 0) {
        throw new Error("Product not found.");
    }
    products.splice(i, 1);
}

/**
 * Converts a list of products into HTML and inserts it into a given element.
 * @param {Product[]} list - The list of products.
 * @param {HTMLElement} eList - The HTML element where the products will be displayed.
 */
function productListToHTML(list, eList) {
    eList.innerHTML = list.map(product => product.toHTML()).join("");
}
