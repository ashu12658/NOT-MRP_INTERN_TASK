const Product = require('../model/Product');
const Transaction = require('../model/Transaction');

const inventory = async (req, res) => {
  const products = await Product.find({ businessId: req.user._id }).select('name stock price category');
  res.json(products);
};

const transactions = async (req, res) => {
  const { from, to, type } = req.query;
  const filter = { businessId: req.user._id };
  if (type) filter.type = type;
  if (from || to) filter.date = {};
  if (from) filter.date.$gte = new Date(from);
  if (to) filter.date.$lte = new Date(to);
  const txs = await Transaction.find(filter).populate('products.productId').populate('customerId vendorId');
  res.json(txs);
};

module.exports = { inventory, transactions };
