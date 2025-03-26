// Francisco Javier Ramos Jiménez

// Custom error class for Product-related exceptions
class ProductException extends Error {
  constructor(message) {
    super(message);
    this.name = "ProductException";  // Set the error name to "ProductException"
  }
}

// Product class definition
export default class Product {
  // Constructor to initialize a new product
  constructor(title, price, category, imageURL, _id = null) {
    this.title = title;  // Calls setter for title validation
    this.price = price;  // Calls setter for price validation
    this.category = category;  // Calls setter for category validation
    this.imageURL = imageURL;  // Calls setter for imageURL validation
    this._id = _id;  // Set the product ID (optional)
  }

  // Getters for product properties
  get title() {
    return this._title;
  }

  get price() {
    return this._price;
  }

  get category() {
    return this._category;
  }

  get imageURL() {
    return this._imageURL;
  }

  get id() {
    return this._id;
  }

  // Setters for product properties with validation
  set title(value) {
    if (!value || typeof value !== "string" || value.trim() === "") {
      throw new ProductException("Invalid title parameter.");
    }
    this._title = value;
  }

  set price(value) {
    if (typeof value !== "number" || Number.isNaN(value) || value < 0) {
      throw new ProductException("Invalid price parameter.");
    }
    this._price = value;
  }

  set category(value) {
    if (!value || typeof value !== "string" || value.trim() === "") {
      throw new ProductException("Invalid category parameter.");
    }
    this._category = value;
  }

  set imageURL(value) {
    if (!value || typeof value !== "string" || value.trim() === "") {
      throw new ProductException("Invalid image URL.");
    }
    this._imageURL = value;
  }

  // Setter for _id with no validation (direct assignment)
  set id(value) {
    this._id = value;
  }

  // Static method to create a Product instance from JSON string
  static createFromJson(jsonValue) {
    try {
      const parsedObj = JSON.parse(jsonValue);
      return Product.createFromObject(parsedObj);  // Create Product from the parsed object
    } catch (error) {
      throw new ProductException("Invalid JSON!");
    }
  }

  // Static method to create a Product instance from a plain object
  static createFromObject(obj) {
    return new Product(
      obj.title,
      obj.price,
      obj.category,
      obj.imageURL,
      obj._id
    );
  }
}
