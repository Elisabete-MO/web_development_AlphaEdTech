import { connectToDatabase } from "../db/postgresql.js";

export const clientRepository = {
  getAllClients: async () => {
    const db = await connectToDatabase();
    const query = "SELECT * FROM client";
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

  getClientById: async (id) => {
    const db = await connectToDatabase();
    const query = "SELECT * FROM client WHERE id = $1";
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

  createClient: async (client) => {
    const db = await connectToDatabase();
    const query = "INSERT INTO client (full_name, birth_date, cpf, email, phone, password_hash, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
    const values = [client.full_name, client.birth_date, client.cpf, client.email, client.phone, client.password_hash, process.env.ADMIN_ID, process.env.ADMIN_ID];
    try {
      const result = await db.query(query, values);
      await db.end();
      return result.rows[0];
    } catch (error) {
      console.error("Error creating client:", error);
      throw error;
    }
  },

  updateClient: async (id, client) => {
    const db = await connectToDatabase();
    const query = "UPDATE client SET full_name = $1, birth_date = $2, cpf = $3, email = $4, phone = $5, password_hash = $6, updated_at = CURRENT_TIMESTAMP, updated_by = $7 WHERE id = $8 RETURNING *";
    const values = [client.full_name, client.birth_date, client.cpf, client.email, client.phone, client.password_hash, process.env.ADMIN_ID, id];
    try {
      const result = await db.query(query, values);
      await db.end();
      return result.rows[0];
    } catch (error) {
      console.error("Error updating client:", error);
      throw error;
    }
  },

  deleteClient: async (id) => {
    const db = await connectToDatabase();
    const query = "DELETE FROM client WHERE id = $1 RETURNING *";
    const values = [id];
    try {
      const result = await db.query(query, values);
      await db.end();
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting client:", error);
      throw error;
    }
  }
}
