const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.js');
const { authorizeRole, isOwnerOrAdmin } = require('../middleware/roles.js');

//Publico
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);


//Admin
router.get('/', verifyToken, authorizeRole(['admin']), userController.getUsers);
router.delete('/:id', verifyToken, authorizeRole(['admin']), userController.deleteUser);

//Admin o dueño
router.get('/:id', verifyToken, isOwnerOrAdmin, userController.getUserById);
router.put('/:id', verifyToken, isOwnerOrAdmin, userController.updateUser);


module.exports = router;
