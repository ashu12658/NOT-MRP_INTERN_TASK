  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const User = require('../model/User');

  const register = async (req, res) => {
    try {
      const { businessName, email, username, password } = req.body;
      if (!businessName || !email || !password) return res.status(400).json({ message: 'Missing fields' });

      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: 'Email already used' });

      const hashed = await bcrypt.hash(password, 10);
      user = new User({ businessName, email, username, password: hashed });
      await user.save();
      res.json({  user: { id: user._id, businessName, email } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const login = async (req, res) => {
    try {
      const { email , password } = req.body;
      if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

      const user = await User.findOne({ $or: [{ email: email }, { username: email }] });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
      res.json({ token, user: { id: user._id, businessName: user.businessName, email: user.email } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const logout = async (req, res) => {
    res.json({ message: 'Logged out (client should discard token)' });
  };

  module.exports = { register, login, logout };
