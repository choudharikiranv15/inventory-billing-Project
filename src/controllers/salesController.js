const pool = require('../config/db'); // Import database connection
const { createSale, getSales } = require('../models/salesModel');

exports.addSale = async (req, res) => {
    try {
        const { product_id, quantity_sold } = req.body;

        // Check if the product exists and has enough stock
        const productCheck = await pool.query(
            'SELECT quantity FROM products WHERE id = $1',
            [product_id]
        );

        if (productCheck.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        if (productCheck.rows[0].quantity < quantity_sold) {
            return res.status(400).json({ error: "Not enough stock available" });
        }

        const sale = await createSale(product_id, quantity_sold);
        res.status(201).json(sale);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSales = async (req, res) => {
    try {
        const sales = await getSales();
        res.json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
