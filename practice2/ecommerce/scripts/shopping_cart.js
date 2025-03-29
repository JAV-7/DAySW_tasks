// Francisco Javier Ramos Jimenez
// shopping_cart_handler is responsible for managing the shopping cart
const shopping_cart_handler = {
  // The cart starts as an empty array
  cart: [],

  //Adds an item to the cart.
  addItem(productId, amount = 1) {
    if (!productId || amount <= 0) { throw new Error("Invalid data to append!"); }

    // Check if the product is already in the cart
    const inStock = this.cart.find(item => item.productId === productId);

    if (inStock) { inStock.amount += amount;
    } else {
      // Otherwise, add a new entry with a unique ID
      this.cart.push({
        uuid: crypto.randomUUID(), 
        productId,
        amount
      });
    }
  },

  // Updates the quantity of an item in the cart.
  updateItem(uuid, newAmount) {
    // Find the item by its unique identifier
    const item = this.cart.find(item => item.uuid === uuid);

    if (!item) return; 
    // Validate the new amount
    if (newAmount < 0) throw new Error("Negative amounts is a NO!");
    
    if (newAmount === 0) { this.removeItem(uuid);}  
    else { item.amount = newAmount; }
  },

  // Removes an item from the cart.
  removeItem(uuid) {
    this.cart = this.cart.filter(item => item.uuid !== uuid);
  },

  //Calculates the total price of the items in the cart.

  calculateTotal(products) {
    return this.cart.reduce((total, item) => {
      // Find the corresponding product using its ID
      const product = products.find(p => p._id === item.productId);
      return product ? total + product.price * item.amount : total;
    }, 0);  // Initialize the total as 0
  }
};

export default shopping_cart_handler;
