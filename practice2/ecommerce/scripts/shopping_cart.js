// Francisco Javier Ramos Jimenez
// shopping_cart_handler is responsible for managing the shopping cart
const shopping_cart_handler = {
  // The cart starts as an empty array
  cart: [],

  /**
   * Adds an item to the cart.
   * @param {string} productId - The ID of the product to be added.
   * @param {number} amount - The quantity of the product. Default is 1.
   * @throws {Error} If invalid data is provided.
   */
  addItem(productId, amount = 1) {
    // Ensure valid data
    if (!productId || amount <= 0) { throw new Error("Invalid data to append!"); }

    // Check if the product is already in the cart
    const inStock = this.cart.find(item => item.productId === productId);

    if (inStock) {
      // If it exists, increase the amount
      inStock.amount += amount;
    } else {
      // Otherwise, add a new entry with a unique ID
      this.cart.push({
        uuid: crypto.randomUUID(), // Generate a unique identifier for the item
        productId,
        amount
      });
    }
  },

  /**
   * Updates the quantity of an item in the cart.
   * @param {string} uuid - The unique identifier of the item in the cart.
   * @param {number} newAmount - The new quantity to set for the item.
   * @throws {Error} If trying to set a negative quantity.
   */
  updateItem(uuid, newAmount) {
    // Find the item by its unique identifier
    const item = this.cart.find(item => item.uuid === uuid);

    if (!item) return;  // If the item is not found, do nothing

    // Validate the new amount
    if (newAmount < 0) throw new Error("Negative amounts is a NO!");
    
    if (newAmount === 0) {
      // If the new amount is 0, remove the item from the cart
      this.removeItem(uuid);
    } else {
      // Otherwise, update the amount of the item
      item.amount = newAmount;
    }
  },

  /**
   * Removes an item from the cart.
   * @param {string} uuid - The unique identifier of the item to be removed.
   */
  removeItem(uuid) {
    // Filter out the item with the given uuid
    this.cart = this.cart.filter(item => item.uuid !== uuid);
  },

  /**
   * Calculates the total price of the items in the cart.
   * @param {Array} products - The list of available products.
   * @returns {number} - The total price of all items in the cart.
   */
  calculateTotal(products) {
    return this.cart.reduce((total, item) => {
      // Find the corresponding product using its ID
      const product = products.find(p => p._id === item.productId);
      return product ? total + product.price * item.amount : total;
    }, 0);  // Initialize the total as 0
  }
};

export default shopping_cart_handler;
