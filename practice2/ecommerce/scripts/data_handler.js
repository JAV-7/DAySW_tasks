// Francisco Javier Ramos Jimenez
import Product from "./product.js";

// API URL for managing products
const API_URL = "https://crudcrud.com/api/fc48b9c08de84f078f17159ea3358464/products";

// Data handler object to manage product-related API requests
const data_handler = {

  // Fetch all products from the API
  async getProducts() {
    const res = await fetch(API_URL); // Make GET request to fetch all products
    
    // Check if the response was successful
    if (!res.ok) {
      throw new Error(`Error fetching products: ${res.status} ${res.statusText}`); // Throw an error if the response was not ok
    }

    const data = await res.json(); // Parse the JSON data from the response
    
    // Ensure the response is an array of products
    if (!Array.isArray(data)) {
      throw new Error("Invalid response: Expected an array of products");
    }

    // Map the data to Product objects using the createFromObject method
    return data.map(obj => Product.createFromObject(obj));
  },

  // Fetch a single product by its ID
  async getProductById(id) {
    const res = await fetch(`${API_URL}/${id}`); // Make GET request to fetch the product by ID
    
    // Check if the response was successful
    if (!res.ok) {
      throw new Error(`Error fetching product with ID ${id}: ${res.status} ${res.statusText}`); // Throw an error if the response was not ok
    }

    const data = await res.json(); // Parse the JSON data from the response
    
    // Return the product as a Product object created from the response data
    return Product.createFromObject(data);
  },

  // Create a new product by sending a POST request
  async createProduct(product) {
    const res = await fetch(API_URL, {
      method: "POST", // Use POST method to create a new product
      headers: {
        "Content-Type": "application/json", // Set content type as JSON
      },
      body: JSON.stringify(product), // Convert the product object to JSON format
    });

    // Check if the response was successful
    if (!res.ok) throw new Error("Unable to create product");

    // Return the created product's data in JSON format
    return await res.json();
  },

  // Update an existing product by its ID
  async updateProduct(id, updatedP) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT", // Use PUT method to update the product
      headers: {
        "Content-Type": "application/json", // Set content type as JSON
      },
      body: JSON.stringify(updatedP), // Convert the updated product object to JSON format
    });

    // Check if the response was successful
    if (!res.ok) throw new Error(`Unable to update product with ID ${id}`);
  },

  // Delete a product by its ID
  async deleteProduct(id) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE", // Use DELETE method to remove the product
    });

    // Check if the response was successful
    if (!res.ok) throw new Error(`Unable to delete product with ID ${id}`);
  }
};

// Exporting the data handler object for use in other modules
export default data_handler;
