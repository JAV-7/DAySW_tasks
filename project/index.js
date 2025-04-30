// Entry level to server
/* CHECAR BIEN ESTO, ES SOLO UN BOCETO
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Servir HTML desde /public

mongoose.connect('mongodb://localhost:27017/petapp', { useNewUrlParser: true, useUnifiedTopology: true });

const favoriteRoutes = require('./routes/favorite.route');
app.use('/api/favorites', favoriteRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});


*/