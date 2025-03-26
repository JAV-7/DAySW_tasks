// Francisco Javier Ramos Jimenez
// Import necessary handlers for managing products and shopping cart
import data_handler from "../scripts/data_handler.js";
import shopping_cart_handler from "../scripts/shopping_cart_handler.js";

// Event listener that fires when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("main section.row"); // Select the container for product cards
  
  try {
    // Fetch the products from the data handler
    const products = await data_handler.getProducts();
    // Map through the products and generate HTML cards
    container.innerHTML = products.map(product => createCard(product)).join("");
  
  } catch (error) {
    // Log any errors and display a message if the products cannot be loaded
    console.error("An error occurred while loading products:", error);
    container.innerHTML = `<p class="text-danger">Unable to append products.</p>`;
  }
});

// Event listener for clicks on the document to handle adding products to the cart
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("add-cart")) { // Check if the clicked element is an "add to cart" button
    e.preventDefault(); // Prevent the default behavior (i.e., page navigation)
    const productId = e.target.getAttribute("data-id"); // Get the product ID from the button's data-id attribute
  
    try {
      // Add the product to the shopping cart with quantity of 1
      shopping_cart_handler.addItem(productId, 1);
      console.log("New product in the cart:", shopping_cart_handler.cart);
    } catch (error) {
      // Log any errors encountered while adding the product to the cart
      console.error("An error occurred while adding to the cart:", error);
    }
  }
});

// Function to generate the HTML card for each product
function createCard(product) {
  return `
    <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div class="card h-100">
        <img src="${product.imageUrl}" class="card-img-top" alt="${product.title}" />
        <div class="card-body d-flex flex-column">
          <h4 class="card-title">${product.title}</h4>
          <p class="card-text">$ ${product.price}</p>
          <a href="#" class="btn btn-delifesti mt-auto add-cart" data-id="${product._id}">Add to cart</a>
        </div>
      </div>
    </div>
  `;
}
