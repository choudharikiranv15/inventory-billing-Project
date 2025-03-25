const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/productRoutes'); // ✅ Ensure this is correct
const salesRoutes = require('./routes/salesRoutes'); // ✅ Ensure this is correct
const invoiceRoutes = require('./routes/invoiceRoutes'); // ✅ Ensure this is correct
const authRoutes = require('./routes/authRoutes');
const { verifyToken } = require('./middleware/authMiddleware');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Public Routes
app.use('/api/auth', authRoutes);

// Protected Routes
app.use('/api/products', verifyToken, productRoutes);
app.use('/api/sales', verifyToken, salesRoutes);
app.use('/api/invoices', verifyToken, invoiceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
