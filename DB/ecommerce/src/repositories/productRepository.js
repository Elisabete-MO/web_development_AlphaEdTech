import { connectToDatabase } from "../db/postgresql.js";

export const productRepository = {
  getAllProducts: async () => {
    const db = await connectToDatabase();
    const query = "SELECT * FROM product";
    const values = [];
    try {
      const result = await db.query(query, values);
      await db.end();
      return result.rows;
    } catch (error) {
      console.error("Error getting client:", error);
      throw error;
    }
  },

  getProductById: async (id) => {
    const db = await connectToDatabase();
    const query = "SELECT * FROM product WHERE id = $1";
    const values = [id];
    try {
      const result = await db.query(query, values);
      await db.end();
      return result.rows[0];
    } catch (error) {
      console.error("Error getting client by id:", error);
      throw error;
    }
  },

  createProduct: async (product) => {
    const db = await connectToDatabase();
    const query = "INSERT INTO product (sku, name, description, price, weight, stock_quantity, active, category_id, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
    const values = [product.sku, product.name, product.description, product.price, product.weight, product.stock_quantity, product.active, product.category_id, process.env.ADMIN_ID, process.env.ADMIN_ID];
    try {
      const result = await db.query(query, values);
      await db.end();
      return result.rows[0];
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  updateProduct: async (id, product) => {
    const db = await connectToDatabase();
    const query = "UPDATE product SET sku = $1, name = $2, description = $3, price = $4, weight= $5, stock_quantity = $6, active = $7, category_id = $8, updated_at = CURRENT_TIMESTAMP, updated_by = $9 WHERE id = $10 RETURNING *";
    const values = [product.sku, product.name, product.description, product.price, product.weight, product.stock_quantity, product.active, product.category_id, process.env.ADMIN_ID, id];
    try {
      const result = await db.query(query, values);
      await db.end();
      return result.rows[0];
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    const db = await connectToDatabase();
    const query = "DELETE FROM product WHERE id = $1 RETURNING *";
    const values = [id];
    try {
      const result = await db.query(query, values);
      await db.end();
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}
