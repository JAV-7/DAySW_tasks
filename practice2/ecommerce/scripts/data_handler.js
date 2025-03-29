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
      throw new Error(`Error fetching products: ${res.status} ${res.statusText}`);
    }

    const data = await res.json(); // Parse the JSON data from the response
    
    // Check if it is or not an array of products
    if (!Array.isArray(data)) {
      throw new Error("Invalid response: Expected an array of products");
    }

    // Map the data to Product objects using the createFromObject
    return data.map(obj => Product.createFromObject(obj));
  },

  // Fetch a single product by its ID
  async getProductById(id) {
    const res = await fetch(`${API_URL}/${id}`);
    
    if (!res.ok) {
      throw new Error(`Error fetching product with ID ${id}: ${res.status} ${res.statusText}`); 
    }

    const data = await res.json(); 
    
    return Product.createFromObject(data);
  },

  // Create a new product by sending a POST request
  async createProduct(product) {
    const res = await fetch(API_URL, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", // Set content type as JSON
      },
      body: JSON.stringify(product), // Convert the product object to JSON format
    });

    if (!res.ok) throw new Error("Unable to create product");
    return await res.json();
  },

  // Update an existing product by its ID
  async updateProduct(id, updatedP) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedP), 
    });
    if (!res.ok) throw new Error(`Unable to update product with ID ${id}`);
  },

  // Delete a product by its ID
  async deleteProduct(id) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE", 
    });
    if (!res.ok) throw new Error(`Unable to delete product with ID ${id}`);
  }
};

// Exporting the data handler object for other codes
export default data_handler;
