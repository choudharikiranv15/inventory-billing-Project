const pool = require('../config/db');

const createProduct = async (name, category, price, quantity) => {
    const query = `
        INSERT INTO products (name, category, price, quantity)
        VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [name, category, price, quantity];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getProducts = async () => {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
};

module.exports = { createProduct, getProducts };
