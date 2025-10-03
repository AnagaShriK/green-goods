const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { orderItems, totalPrice } = req.body;
    const order = new Order({
      user: req.user.id,
      orderItems,
      totalPrice
    });
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrdersForUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('orderItems.plant');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
