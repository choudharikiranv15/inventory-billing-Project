const express = require('express');
const { addSale, getSales } = require('../controllers/salesController');

const router = express.Router();

router.post('/', addSale);
router.get('/', getSales);

module.exports = router; // ✅ Ensure this line exists
