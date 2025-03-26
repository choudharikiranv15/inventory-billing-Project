import { query as poolQuery } from '../config/db.js';

export const createSale = async (product_id, quantity_sold) => {
  const query = `
    INSERT INTO sales (product_id, quantity_sold)
    VALUES ($1, $2) RETURNING *;
  `;
  const values = [product_id, quantity_sold];
  const result = await poolQuery(query, values);

  // Update product quantity after sale
  await poolQuery(
    `UPDATE products SET quantity = quantity - $1 WHERE id = $2;`,
    [quantity_sold, product_id]
  );

  return result.rows[0];
};

export const getSales = async () => {
  const result = await poolQuery(
    `SELECT sales.id, products.name AS product_name, sales.quantity_sold, sales.sale_date
     FROM sales
     JOIN products ON sales.product_id = products.id;`
  );
  return result.rows;
};
