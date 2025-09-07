require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const reportRoutes = require('./routes/report');

const app = express();
app.use(express.json());
app.use(cors());

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    });

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});