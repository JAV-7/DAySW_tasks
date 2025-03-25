// Francisco Javier Ramos Jimenez



/**
 * Custom exception class for shopping cart errors.
 */
export class CartException extends Error {
    constructor(message) {
        super(message);
        this.name = "CartException";
    }
}

/**
 * Class representing a shopping cart.
 */
export class ShoppingCart {
    constructor() {
        /** @type {Map<number, number>} Stores product ID and quantity */
        this.items = new Map();
        
        /** @type {MockAPI} Simulated API for fetching product data */
        this.productStorage = new MockAPI('products');
    }

    /**
     * Adds an item to the shopping cart.
     * @param {number} productID - The ID of the product to add.
     * @param {number} amount - The quantity of the product to add.
     * @throws {CartException} If parameters are invalid or product doesn't exist.
     */
    async addItem(productID, amount) {
        if (!productID || !Number.isInteger(amount) || amount <= 0) {
            throw new CartException("Invalid parameters");
        }

        // If the product is already in the cart, update the quantity
        if (this.items.has(productID)) {
            this.items.set(productID, this.items.get(productID) + amount);
        } else {
            // Check if the product exists in the product storage
            const products = await this.productStorage.getAll();
            const productExists = products.some(product => product.id === productID);
            if (!productExists) throw new CartException("Product does not exist!");

            // Add the product to the cart with the given quantity
            this.items.set(productID, amount);
        }
    }

    /**
     * Updates the quantity of an item in the shopping cart.
     * @param {number} productID - The ID of the product to update.
     * @param {number} amount - The new quantity of the product.
     * @throws {CartException} If parameters are invalid or product is not found.
     */
    async updateItem(productID, amount) {
        if (!productID || !Number.isInteger(amount) || amount < 0) {
            throw new CartException("Invalid parameters");
        }
        if (!this.items.has(productID)) {
            throw new CartException("Product not found");
        }

        // Remove the item if amount is zero, otherwise update its quantity
        if (amount === 0) {
            this.removeItem(productID);
        } else {
            this.items.set(productID, amount);
        }
    }

    /**
     * Removes an item from the shopping cart.
     * @param {number} productID - The ID of the product to remove.
     * @throws {CartException} If the product is not in the cart.
     */
    removeItem(productID) {
        if (!this.items.has(productID)) {
            throw new CartException("The product is not in the cart.");
        }
        this.items.delete(productID);
    }

    /**
     * Calculates the total cost of items in the shopping cart.
     * @returns {Promise<number>} The total price of all items in the cart.
     * @throws {CartException} If a product in the cart is not found.
     */
    async calculateTotal() {
        let total = 0;
        const products = await this.productStorage.getAll(); // Fetch all products

        for (const [productID, amount] of this.items.entries()) {
            const product = products.find(p => p.id === productID);
            if (!product) {
                throw new CartException(`Product with ID ${productID} not found.`);
            }
            total += product.price * amount;
        }

        return total;
    }
}
