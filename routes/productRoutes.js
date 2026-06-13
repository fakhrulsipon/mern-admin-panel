const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ১. সব প্রোডাক্ট দেখা (READ)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ২. নতুন প্রোডাক্ট যোগ করা (CREATE)
router.post('/', async (req, res) => {
  try {
    const { name, price, category, stock, description, image } = req.body;
    const product = await Product.create({ name, price, category, stock, description, image });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ৩. প্রোডাক্ট এডিট/আপডেট করা (UPDATE)
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ৪. প্রোডাক্ট ডিলিট করা (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;