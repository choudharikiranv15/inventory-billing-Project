const express = require('express');
const { generateInvoice, getInvoices, generateInvoicePDF } = require('../controllers/invoiceController'); // ✅ Correct import

const router = express.Router();

// Ensure these functions exist before using them
if (!generateInvoice || !getInvoices || !generateInvoicePDF) {
    throw new Error("One or more functions are undefined in invoiceRoutes.js");
}

router.post('/', generateInvoice); 
router.get('/', getInvoices); 
router.get('/download/:invoice_id', generateInvoicePDF);

module.exports = router; // ✅ Ensure this line exists
