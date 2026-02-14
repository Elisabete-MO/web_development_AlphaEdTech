import { Router } from "express";
import { clientController } from "../controllers/clientController.js";

const clientRoutes = Router();

clientRoutes.get("/", clientController.getAllClients);
clientRoutes.get("/:id", clientController.getClientById);
clientRoutes.post("/", clientController.createClient);
clientRoutes.put("/:id", clientController.updateClient);
clientRoutes.delete("/:id", clientController.deleteClient);

export default clientRoutes;
