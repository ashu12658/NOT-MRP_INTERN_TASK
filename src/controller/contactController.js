const Contact = require('../model/Contact');

const list = async (req, res) => {
  const { q, type } = req.query;
  const filter = { businessId: req.user._id };
  if (q) filter.name = { $regex: q, $options: 'i' };
  if (type) filter.type = type;
  const contacts = await Contact.find(filter);
  res.json(contacts);
};

const create = async (req, res) => {
  const data = { ...req.body, businessId: req.user._id };
  const c = new Contact(data);
  await c.save();
  res.status(201).json(c);
};

const update = async (req, res) => {
  const { id } = req.params;
  const c = await Contact.findOneAndUpdate({ _id: id, businessId: req.user._id }, req.body, { new: true });
  if (!c) return res.status(404).json({ message: 'Not found' });
  res.json(c);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const c = await Contact.findOneAndDelete({ _id: id, businessId: req.user._id });
  if (!c) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};

module.exports = { list, create, update, remove };
