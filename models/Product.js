const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  description: { type: String },
  image: { type: String, default: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);