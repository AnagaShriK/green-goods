const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      plant: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant', required: true },
      name: String,
      qty: Number,
      price: Number
    }
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'Processing' }
});

module.exports = mongoose.model('Order', OrderSchema);
