const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { authorizeRole } = require('../middleware/roles.middleware');

router.get('/', verifyToken, petController.getPets);
router.get('/:id', verifyToken, petController.getPetById);
router.get('/species/:species', verifyToken, petController.getPetBySpecies);
router.get('/breed/:breed', verifyToken, petController.getPetByBreed);
router.post('/', verifyToken, petController.createPet);

//Only admin
router.put('/:id', verifyToken, authorizeRole(['admin']), petController.updatePet);
router.delete('/:id', verifyToken, authorizeRole(['admin']), petController.deletePet);

module.exports = router;