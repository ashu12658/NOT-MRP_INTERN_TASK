const Transaction = require('../model/Transaction');
const Product = require('../model/Product');
const Contact = require('../model/Contact');

const list = async (req, res) => {
  const { type, from, to } = req.query;
  const filter = { businessId: req.user._id };
  if (type) filter.type = type;
  if (from || to) filter.date = {};
  if (from) filter.date.$gte = new Date(from);
  if (to) filter.date.$lte = new Date(to);
  const txs = await Transaction.find(filter).populate('products.productId').populate('customerId vendorId');
  res.json(txs);
};

const create = async (req, res) => {
  const { type, contactId, products } = req.body;
  if (!['sale','purchase'].includes(type)) return res.status(400).json({ message: 'Invalid type' });

  // contact validation
  const contact = await Contact.findOne({ _id: contactId, businessId: req.user._id });
  if (!contact) return res.status(400).json({ message: 'Contact not found' });

  // calculate total & update stock
  let total = 0;
  const txProducts = [];
  for (const p of products) {
    const prod = await Product.findOne({ _id: p.productId, businessId: req.user._id });
    if (!prod) return res.status(400).json({ message: `Product ${p.productId} not found` });
    const price = p.price ?? prod.price;
    total += price * p.quantity;
    txProducts.push({ productId: prod._id, quantity: p.quantity, price });

    // update stock
    if (type === 'sale') {
      prod.stock = Math.max(0, (prod.stock || 0) - p.quantity);
    } else {
      prod.stock = (prod.stock || 0) + p.quantity;
    }
    await prod.save();
  }

  const tx = new Transaction({
    type,
    customerId: type === 'sale' ? contact._id : undefined,
    vendorId: type === 'purchase' ? contact._id : undefined,
    products: txProducts,
    totalAmount: total,
    businessId: req.user._id
  });
  await tx.save();
  res.status(201).json(tx);
};

module.exports = { list, create };
