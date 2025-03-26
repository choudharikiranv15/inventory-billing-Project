import { query, getClient } from '../config/db.js';

export const ProductModel = {
  // Create new product
  async create({ name, barcode, price, quantity, category }) {
    const { rows } = await query(
      `INSERT INTO products 
       (name, barcode, price, quantity, category) 
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, barcode, price, quantity, category]
    );
    return rows[0];
  },

  // Get product by ID
  async findById(id) {
    const { rows } = await query(
      `SELECT * FROM products WHERE id = $1`,
      [id]
    );
    return rows[0];
  },

  // Update stock quantity (atomic operation)
  async updateStock(productId, quantityChange) {
    const client = await getClient();
    try {
      await client.query('BEGIN');
      
      const { rows } = await client.query(
        `UPDATE products 
         SET quantity = quantity + $1 
         WHERE id = $2
         RETURNING *`,
        [quantityChange, productId]
      );

      // Check low stock
      if (rows[0]?.quantity <= rows[0]?.min_stock_level) {
        await this.triggerLowStockAlert(client, productId);
      }

      await client.query('COMMIT');
      return rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  async triggerLowStockAlert(client, productId) {
    await client.query(
      `INSERT INTO stock_alerts (product_id, alert_type)
       VALUES ($1, 'low_stock')`,
      [productId]
    );
  }
};