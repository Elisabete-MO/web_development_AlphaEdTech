import { Router } from "express";
import { orderController } from "../controllers/index.js";
import { validateBody } from "../middlewares/validate.js";
import { orderSchema } from "../validators/orderSchema.js";

const router = Router();

// GET /api/order
router.get("/", orderController.listOrders);

// GET /api/order/:id
router.get("/:id", orderController.getOrderById);

// POST /api/order
router.post("/", validateBody(orderSchema), orderController.createOrder);

// PUT /api/order/:id
router.put("/:id", validateBody(orderSchema), orderController.editOrder);

// DELETE /api/order/:id
router.delete("/:id", orderController.removeOrder);

export default router;
