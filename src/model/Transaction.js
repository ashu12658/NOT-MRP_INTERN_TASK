const mongoose = require('mongoose');

const txProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  price: Number
});

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['sale','purchase'], required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }, 
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },   
  products: [txProductSchema],
  totalAmount: Number,
  date: { type: Date, default: Date.now },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Transaction', transactionSchema);
