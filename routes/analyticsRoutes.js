const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');

// ড্যাশবোর্ডের সব সামারি ডাটা একসাথে পাওয়ার API
router.get('/summary', async (req, res) => {
  try {
    // ১. মোট প্রোডাক্ট সংখ্যা
    const totalProducts = await Product.countDocuments();

    // ২. সব অর্ডারের লিস্ট
    const orders = await Order.find();

    // ৩. মোট অর্ডার সংখ্যা
    const totalOrders = orders.length;

    // ৪. পেন্ডিং অর্ডারের সংখ্যা হিসাব করা
    const pendingOrders = orders.filter(order => order.status === 'Pending').length;

    // ৫. টোটাল রেভিনিউ/সেলস হিসাব করা (শুধুমাত্র Delivered বা সাকসেসফুল অর্ডারগুলোর জন্য হিসাব করা ভালো, তবে আমরা সব অর্ডারের টোটাল নিচ্ছি)
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // ৬. একদম শেষ ৫টি অর্ডার ফ্রন্টএন্ডের টেবিলের জন্য পাঠানো
    const recentOrders = await Order.find()
      .populate('products.product')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalProducts,
      totalOrders,
      pendingOrders,
      totalRevenue,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;