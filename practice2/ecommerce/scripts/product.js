//Francisco Javier Ramos Jiménez

/**
 * Custom exception class for product-related errors.
 */
export class ProductException extends Error { 
    constructor(message) {
        super(message);
        this.name = "ProductException";
    }
}

/**
 * Class representing a product.
 */
export class Product {
    constructor(name, price, stock, imageURL) {
        /** @type {string} Unique product ID */
        this._id = crypto.randomUUID();
        
        /** @type {string} Product name */
        this._name = "";
        
        /** @type {number} Product price */
        this._price = 0;
        
        /** @type {number} Product stock quantity */
        this._stock = 0;
        
        /** @type {string} Product image URL */
        this._imageURL = "";
        
        // Set properties using their respective setters
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.image = imageURL;
    }

    /**
     * Sets the product name.
     * @param {string} name - The name of the product.
     * @throws {ProductException} If the name is invalid.
     */
    set name(name) {
        if (typeof name !== "string" || name.trim() === "") throw new ProductException("Invalid name!");
        this._name = name;
    }

    /**
     * Sets the product price.
     * @param {number} price - The price of the product.
     * @throws {ProductException} If the price is invalid.
     */
    set price(price) {
        if (typeof price !== "number" || price <= 0) throw new ProductException("Invalid price!");
        this._price = price;
    }

    /**
     * Sets the product stock quantity.
     * @param {number} stock - The stock quantity.
     * @throws {ProductException} If the stock is invalid.
     */
    set stock(stock) {
        if (typeof stock !== "number" || stock <= 0) throw new ProductException("Invalid stock!");
        this._stock = stock;
    }

    /**
     * Sets the product image URL.
     * @param {string} imageURL - The image URL.
     * @throws {ProductException} If the URL is invalid.
     */
    set image(imageURL) {
        if (typeof imageURL !== "string" || imageURL === "") throw new ProductException("Invalid URL");
        this._imageURL = imageURL;
    }

    get name() { return this._name; }
    get id() { return this._id; }
    get price() { return this._price; }
    get stock() { return this._stock; }
    get image() { return this._imageURL; }

    /**
     * Creates a Product instance from an object.
     * @param {Object} obj - The object containing product data.
     * @returns {Product} The created Product instance.
     * @throws {ProductException} If the object is invalid.
     */
    static createFromObject(obj) {
        if (!obj || typeof obj !== "object") throw new ProductException("Invalid Object");
        return new Product(obj.name, obj.price, obj.stock, obj.imageURL);
    }

    /**
     * Creates a Product instance from a JSON string.
     * @param {string} jsonValue - The JSON string.
     * @returns {Product} The created Product instance.
     * @throws {ProductException} If the JSON is invalid.
     */
    static createFromJson(jsonValue) {
        if (!jsonValue || typeof jsonValue !== "string") throw new ProductException("Invalid JSON");
        try {
            let obj = JSON.parse(jsonValue);
            return Product.createFromObject(obj); 
        } catch (error) {
            throw new ProductException("Invalid JSON");
        }
    }

    /**
     * Generates an HTML representation of the product.
     * @param {Object} obj - The product object.
     * @returns {string} HTML string representing the product.
     */
    static toHTML(obj) {
        return `
            <div class="card" style="width: 18rem;">
            <img src="${obj.imageURL}" class="card-img-top" alt="${obj.name}">
            <div class="card-body">
                <h5 class="card-title">${obj.name}</h5>
                <p class="card-text">Stock: ${obj.stock}</p>
                <p class="card-text">Price: ${obj.price}</p>
            </div>
            </div>
        `;
    }
}
