import Product from "../scripts/product.js";
import data_handler from "../scripts/data_handler.js";
import shopping_cart_handler from "../scripts/shopping_cart.js";
// PRODUCT TEST
// Valid item
let item1 = new Product("BLUE", 5, "ALBUM", "https://th.bing.com/th/id/OIP.T4LeXfoS00ttpoereIkU4wHaHa?rs=1&pid=ImgDetMain", 3);
console.log(item1);

/*
// Negative price
let item2 = new Product("BEING FUNNY IN A FOREIGN KANGUAGE", -10, "Album", "https://th.bing.com/th/id/OIP.GRNgGC4oi3Yuk7xkmtGRrQHaHa?rs=1&pid=ImgDetMain"); 
*/

// DATA HANDLER TEST
let p = {
  title: "RED (Taylor's Version)",
  price: 20,
  category: "Album",
  imageURL: "https://th.bing.com/th/id/OIP.T4LeXfoS00ttpoereIkU4wHaHa?rs=1&pid=ImgDetMain",
};

data_handler.createProduct(p).then((created) => {
  console.log("Created:", created);

  let idP = created._id; // Id given by server

  // Get
  return data_handler.getProductById(idP).then((product) => {
    console.log("Fetched:", product);

    // Update
    let updated = {
      title: "BEING FUNNY IN A FOREIGN LANGUAGE",
      price: 5,
      category: "Album",
      imageURL: "https://th.bing.com/th/id/OIP.GRNgGC4oi3Yuk7xkmtGRrQHaHa?rs=1&pid=ImgDetMain"
    };

    return data_handler.updateProduct(idP, updated).then(() => {
      console.log("Updated");

      // Delete
      return data_handler.deleteProduct(idP).then(() => {
        console.log("Deleted");
      });
    });
  });
}).catch(console.error);

// SHOPPING CART

// ADD TO CART
shopping_cart_handler.addItem("PRODUCT_ID", "67e38167ddc32303e8df1ff4");
console.log(shopping_cart_handler.cart);

// VIEW TOTAL
data_handler.getProducts().then(products => {
  let total = shopping_cart_handler.calculateTotal(products);
  console.log("Total: $" + total);
});

// GET UUID
let uuid = shopping_cart_handler.cart[0].uuid;

// CHANGE QUANTITY
shopping_cart_handler.updateItem(uuid, 5);
console.log(shopping_cart_handler.cart);

// DELETE FROM CART
shopping_cart_handler.removeItem(uuid);
console.log(shopping_cart_handler.cart)

