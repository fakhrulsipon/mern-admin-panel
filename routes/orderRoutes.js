const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// ১. সব অর্ডার দেখা (অ্যাডমিন প্যানেলের জন্য)
router.get('/', async (req, res) => {
  try {
    // .populate('products.product') দিলে অর্ডারের ভেতরের প্রোডাক্টের নাম-দাম সব চলে আসবে
    const orders = await Order.find().populate('products.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ২. নতুন অর্ডার তৈরি করা (চেকআউট বা টেস্ট করার জন্য)
router.post('/', async (req, res) => {
  try {
    const { customerName, email, products, totalAmount } = req.body;
    const order = await Order.create({ customerName, email, products, totalAmount });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ৩. অর্ডারের স্ট্যাটাস আপডেট করা (যেমন: Pending -> Shipped)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    ).populate('products.product');
    
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;