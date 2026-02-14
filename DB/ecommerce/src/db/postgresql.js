import { Client } from "pg";

export async function connectToDatabase() {
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD_DB,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();
    console.log("Conectado ao banco de dados");
    return client;
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados", error);
    throw error;
  }
}
