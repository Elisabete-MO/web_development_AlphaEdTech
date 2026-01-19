import { Router } from "express";
import { orderController } from "../controllers/index.js";
import { validateOrderBody } from "../validators/orderValidator.js";

const router = Router();

// GET /api/order
router.get("/", orderController.listOrders);

// GET /api/order/:id
router.get("/:id", orderController.getOrderById);

// POST /api/order
router.post("/", validateOrderBody, orderController.createOrder);

// PUT /api/order/:id
router.put("/:id", validateOrderBody, orderController.editOrder);

// DELETE /api/order/:id
router.delete("/:id", orderController.removeOrder);

export default router;
