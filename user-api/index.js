require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/database');
const userRoutes = require('./routes/user.routes');
connectDB();
app.use(express.json());
// Rutas
app.use('/api/users', userRoutes);
// starting server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(` Running server on http://localhost:${PORT}`);
});

