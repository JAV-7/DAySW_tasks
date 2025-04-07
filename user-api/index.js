require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const setupSwagger = require("./config/swaggerConfig");
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');


const app = express();




connectDB();

// To expect Content-Type: application/json and process
// https://www.geeksforgeeks.org/express-js-express-json-function/

app.use(express.json());
setupSwagger(app);


// Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


// starting server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(` Running server on http://localhost:${PORT}`);
});
