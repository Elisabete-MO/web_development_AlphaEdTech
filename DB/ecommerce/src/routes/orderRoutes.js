import { Router } from "express";
import { orderController } from "../controllers/orderController.js";

const orderRoutes = Router();

orderRoutes.get("/", orderController.getAllOrders);
orderRoutes.get("/:id", orderController.getOrderById);
orderRoutes.post("/", orderController.createOrder);
orderRoutes.put("/:id", orderController.updateOrder);
orderRoutes.delete("/:id", orderController.deleteOrder);

export default orderRoutes;
