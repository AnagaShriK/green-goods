const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');
const { protect } = require('../middleware/auth');

// public
router.get('/', plantController.getPlants);
router.get('/:id', plantController.getPlantById);

// admin operations - in this simple example protect is used; in production check isAdmin
router.post('/', protect, plantController.createPlant);
router.put('/:id', protect, plantController.updatePlant);
router.delete('/:id', protect, plantController.deletePlant);

module.exports = router;
