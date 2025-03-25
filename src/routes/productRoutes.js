const express = require('express');
const { addProduct, getProducts } = require('../controllers/productController');

const router = express.Router();

router.post('/', addProduct);
router.get('/', getProducts);

module.exports = router; // ✅ Ensure this line exists
