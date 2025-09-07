const Product = require('../model/Product');

const list = async (req, res) => {
  const { q, category } = req.query;
  const filter = { businessId: req.user._id };
  if (q) filter.name = { $regex: q, $options: 'i' };
  if (category) filter.category = category;
  const products = await Product.find(filter);
  res.json(products);
};

const create = async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  const product = new Product({ name, description, price, stock, category, businessId: req.user._id });
  await product.save();
  res.status(201).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndUpdate({ _id: id, businessId: req.user._id }, req.body, { new: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndDelete({ _id: id, businessId: req.user._id });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Deleted' });
};

const adjustStock = async (req, res) => {
  const { id } = req.params;
  const { delta } = req.body; // + or -
  const product = await Product.findOne({ _id: id, businessId: req.user._id });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  product.stock = Math.max(0, (product.stock || 0) + Number(delta));
  await product.save();
  res.json(product);
};

module.exports = { list, create, update, remove, adjustStock };
