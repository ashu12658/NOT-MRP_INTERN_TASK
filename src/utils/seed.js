require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
const Contact = require('../models/Contact');

const run = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/not_at_mrp';
  await mongoose.connect(uri);
  console.log('connected to db for seeding');

  await User.deleteMany({});
  await Product.deleteMany({});
  await Contact.deleteMany({});

  const pw = await bcrypt.hash('password123', 10);
  const user = new User({ businessName: 'Demo Shop', email: 'demo@shop.com', username: 'demo', password: pw });
  await user.save();

  const p1 = new Product({ name: 'Face Cream', description: 'Moisturizer', price: 199, stock: 50, category: 'Skincare', businessId: user._id });
  const p2 = new Product({ name: 'Lip Balm', price: 99, stock: 100, category: 'Skincare', businessId: user._id });
  await p1.save();
  await p2.save();

  const c1 = new Contact({ name: 'Ramesh', phone: '9999999999', email: 'r@gmail.com', address: 'Mumbai', type: 'customer', businessId: user._id });
  const v1 = new Contact({ name: 'VendorOne', phone: '8888888888', email: 'v@vendor.com', address: 'Delhi', type: 'vendor', businessId: user._id });
  await c1.save(); await v1.save();

  console.log('Seed done. Login with demo@shop.com / password123');
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
