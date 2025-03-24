import Product from './productScript';

/**
 * 
 */
export class ProductManager {
    constructor() {
        this.productStorage = new MockAPI('products'); // Usa MockAPI para persistencia
    }

    async getProducts() {
        return await this.productStorage.getAll(); // Obtiene todos los productos
    }

    async getProductById(uuid) {
        if (!uuid) throw new ProductException("Invalid product ID");
        const products = await this.productStorage.getAll();
        const product = products.find(p => p.id === uuid);
        if (!product) throw new ProductException("Product not found");
        return product;
    }

    async createProduct(product) {
        if (!(product instanceof Product)) {
            throw new ProductException("Invalid product instance");
        }
        return await this.productStorage.create(product);
    }

    async updateProduct(uuid, updatedProduct) {
        if (!uuid) throw new ProductException("Invalid product ID");
        const existingProduct = await this.getProductById(uuid);
        if (!existingProduct) throw new ProductException("Product not found");

        return await this.productStorage.update(uuid, updatedProduct);
    }

    async deleteProduct(uuid) {
        if (!uuid) throw new ProductException("Invalid product ID");
        await this.productStorage.delete(uuid);
    }
}

