const { createProduct, getProducts } = require('../models/productModel');

exports.addProduct = async (req, res) => {
    try {
        const { name, category, price, quantity } = req.body;
        const product = await createProduct(name, category, price, quantity);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
