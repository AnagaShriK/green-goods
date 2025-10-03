const Plant = require('../models/Plant');

// GET /api/plants
exports.getPlants = async (req, res) => {
  try {
    const plants = await Plant.find({});
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/plants/:id
exports.getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.json(plant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/plants
exports.createPlant = async (req, res) => {
  try {
    const newPlant = new Plant(req.body);
    const saved = await newPlant.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/plants/:id
exports.updatePlant = async (req, res) => {
  try {
    const updated = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/plants/:id
exports.deletePlant = async (req, res) => {
  try {
    await Plant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plant removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
