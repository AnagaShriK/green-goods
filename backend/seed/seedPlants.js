require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Plant = require('../models/Plant');

const plants = [
  { name: 'Aloe Vera', image: 'https://via.placeholder.com/150', price: 25, countInStock: 10, description: 'Aloe goodness' },
  { name: 'Snake Plant', image: 'https://via.placeholder.com/150', price: 40, countInStock: 5 },
  { name: 'Peace Lily', image: 'https://via.placeholder.com/150', price: 35, countInStock: 8 }
];

const seed = async () => {
  try {
    await connectDB();
    await Plant.deleteMany({});
    await Plant.insertMany(plants);
    console.log('Seeded plants');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
