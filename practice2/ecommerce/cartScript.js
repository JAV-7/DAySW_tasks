// Francisco Javier Ramos Jimenez
import Product from './productScript';

/**
 * 
 */
export class CartException extends Error {
    constructor(message) {
        super(message);
        this.name = "CartException";
    }
}

/**
 * 
 */
export class Cart {
    constructor() {
        this.items = new Map();
        this.productStorage = new MockAPI('products');
    }

    async addItem(productUUID, amount) {
        if (!productUUID || !Number.isInteger(amount) || amount <= 0) {
            throw new CartException("Invalid parameters");
        }

        // If the product already exists in cart, increase the quantity
        if (this.items.has(productUUID)) {
            this.items.set(productUUID, this.items.get(productUUID) + amount);
        } else {
            // Ensure the product exists in the product storage before adding
            const products = await this.productStorage.getAll();
            const productExists = products.some(product => product.id === productUUID);
            if (!productExists) throw new CartException("Product does not exist!");

            this.items.set(productUUID, amount);
        }
    }

    async updateItem(productUUID, amount) {
        if (!productUUID || !Number.isInteger(amount) || amount < 0) {
            throw new CartException("Invalid parameters");
        }
        if (!this.items.has(productUUID)) {
            throw new CartException("Product not found");
        }

        if (amount === 0) {
            this.removeItem(productUUID);
        } else {
            this.items.set(productUUID, amount); // Correct way to update the quantity
        }
    }

    removeItem(productUUID) {
        if (!this.items.has(productUUID)) {
            throw new CartException("The product is not in the cart.");
        }
        this.items.delete(productUUID);
    }

    async calculateTotal() {
        let total = 0;
        const products = await this.productStorage.getAll(); // Get all products

        for (const [productUUID, amount] of this.items.entries()) {
            const product = products.find(p => p.id === productUUID);
            if (!product) {
                throw new CartException(`Product with ID ${productUUID} not found.`);
            }
            total += product.price * amount;
        }

        return total;
    }
}
