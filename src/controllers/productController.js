import { ProductModel } from '../models/productModel.js';

export const ProductController = {
  // Create product
  async create(req, res) {
    try {
      const product = await ProductModel.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get product details
  async getById(req, res) {
    try {
      const product = await ProductModel.findById(req.params.id);
      product 
        ? res.json(product)
        : res.status(404).json({ error: 'Product not found' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },


  // Update stock
  async updateStock(req, res) {
    try {
      const updated = await ProductModel.updateStock(
        req.params.id,
        req.body.quantityChange
      );
      res.json(updated);
    } catch (err) {
      res.status(400).json({ 
        error: 'Stock update failed',
        details: err.message 
      });
    }
  }
};