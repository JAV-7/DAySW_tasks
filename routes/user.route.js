const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware.js');
const { authorizeRole, isOwnerOrAdmin } = require('../middleware/roles.middleware.js');
const User = require('../models/user.model'); 
const jwt = require('jsonwebtoken'); 

//Publico
router.post('/', userController.createUser);

//Admin
router.get('/', verifyToken, authorizeRole(['admin']), userController.getUsers);
router.delete('/:id', verifyToken, authorizeRole(['admin']), userController.deleteUser);

//Admin o dueño
router.get('/:id', verifyToken, isOwnerOrAdmin, userController.getUserById);
router.put('/:id', verifyToken, isOwnerOrAdmin, userController.updateUser);

// Login route (using bcrypt password )
router.post('/login', async (req, res) => {
    console.log('Received login request with body:', req.body);
    
    if (!req.body || !req.body.email || !req.body.password) {
      console.log('Missing fields - Request body:', req.body);
      return res.status(400).json({ error: "Email and password required" });
    }
    
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found for email:', email);
        return res.status(404).json({ error: "User not found" });
      }
      
      console.log('Found user:', user);
      
      // Use the comparePassword method instead of direct comparison
      const isMatch = await user.comparePassword(password);
      
      if (!isMatch) {
        console.log('Password mismatch for user:', email);
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || '123xyz', // Fallback to secret
        { expiresIn: '1h' }
      );
      
      console.log('Login successful for:', email);
      res.json({ token });
      
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router;
