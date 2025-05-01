// Load environment variables first
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors()); //  ENABLES CORS
app.use(express.json()); // to parse JSON from frontend


// Basic MongoDB connection (replace with your database.js if preferred)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.static(path.join(__dirname, 'interfaces')));

// Routes
const userRoutes = require('./routes/user.route');
const petRoutes = require('./routes/pet.route');
const adoptionRoutes = require('./routes/adoption.route');
const favoriteRoutes = require('./routes/favorite.route');

app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/favorites', favoriteRoutes);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//test
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Backend activated' });
  console.log('Ping received from frontend!');
});