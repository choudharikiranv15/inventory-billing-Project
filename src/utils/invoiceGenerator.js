const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateInvoicePDF = (invoice, callback) => {
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `../../invoices/invoice_${invoice.id}.pdf`);
    
    // Ensure invoices directory exists
    if (!fs.existsSync(path.join(__dirname, '../../invoices'))) {
        fs.mkdirSync(path.join(__dirname, '../../invoices'));
    }

    doc.pipe(fs.createWriteStream(filePath));

    // PDF Header
    doc.fontSize(18).text("Invoice", { align: "center" }).moveDown();
    doc.fontSize(12).text(`Invoice ID: ${invoice.id}`);
    doc.text(`Product: ${invoice.product_name}`);
    doc.text(`Total Amount: ₹${invoice.total_amount}`);
    doc.text(`Date: ${invoice.invoice_date}`);
    
    doc.end();

    callback(filePath);
};

module.exports = generateInvoicePDF;
