import express from "express";
import { createServer } from "http";
import { connectToDatabase } from "./db/postgresql.js";
import dotenv from "dotenv";
import { router } from "./routes/router.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);

  try {
    connectToDatabase();
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}); 