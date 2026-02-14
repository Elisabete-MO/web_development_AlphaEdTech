import { connectToDatabase } from "../db/postgresql.js";

export const orderRepository = {
  getAllOrders: async () => {
    const db = await connectToDatabase();
    const query = "SELECT * FROM \"order\"";
    const values = [];
    try {
      const result = await db.query(query, values);
      await db.end();
      return result.rows;
    } catch (error) {
      console.error("Error getting order:", error);
      throw error;
    }
  },

  getOrderById: async (id) => {
    const db = await connectToDatabase();
    const query = "SELECT * FROM \"order\" WHERE id = $1";
    const values = [id];
    try {
      const result = await db.query(query, values);
      await db.end();
      return result.rows[0];
    } catch (error) {
      console.error("Error getting order by id:", error);
      throw error;
    }
  },

  createOrder: async (order) => {
    const db = await connectToDatabase();
    const query = "INSERT INTO \"order\" (client_id, status, total_amount, created_by, updated_by) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [order.client_id, order.status, order.total_amount, process.env.ADMIN_ID, process.env.ADMIN_ID];
    try {
      const result = await db.query(query, values);
      await db.end();
      return result.rows[0];
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  updateOrder: async (id, order) => {
    const db = await connectToDatabase();
    const query = "UPDATE \"order\" SET client_id = $1, status = $2, total_amount = $3, updated_at = CURRENT_TIMESTAMP, updated_by = $4 WHERE id = $5 RETURNING *";
    const values = [order.client_id, order.status, order.total_amount, process.env.ADMIN_ID, id];
    try {
      const result = await db.query(query, values);
      await db.end();
      return result.rows[0];
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  },

  deleteOrder: async (id) => {
    const db = await connectToDatabase();
    const query = "DELETE FROM \"order\" WHERE id = $1 RETURNING *";
    const values = [id];
    try {
      const result = await db.query(query, values);
      await db.end();
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }
}
