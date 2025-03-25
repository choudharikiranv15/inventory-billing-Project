const pool = require('../config/db');

const createInvoice = async (sale_id, total_amount) => {
    const query = `
        INSERT INTO invoices (sale_id, total_amount)
        VALUES ($1, $2) RETURNING *;
    `;
    const values = [sale_id, total_amount];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getInvoices = async () => {
    const result = await pool.query(
        `SELECT invoices.id, sales.product_id, invoices.total_amount, invoices.invoice_date
         FROM invoices
         JOIN sales ON invoices.sale_id = sales.id;`
    );
    return result.rows;
};

module.exports = { createInvoice, getInvoices };
