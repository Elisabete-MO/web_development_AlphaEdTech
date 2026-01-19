import { Router } from "express";
import { orderController } from "../controllers/index.js";
import { validateBody, validateQuery } from "../middlewares/validate.js";
import { orderSchema, updateOrderSchema } from "../validators/orderSchema.js";
import { orderSearchSchema } from "../validators/orderSearchSchema.js";
import { validateParams } from "../validators/validateParams.js";
import { idSchema } from "../validators/idSchema.js";

const router = Router();

// GET /api/order
router.get("/", orderController.listOrders);

// GET /api/order/search
router.get("/search", validateQuery(orderSearchSchema), orderController.searchOrders);

// GET /api/order/:id
router.get("/:id", validateParams(idSchema), orderController.getOrderById);

// POST /api/order
router.post("/", validateBody(orderSchema), orderController.createOrder);

// PUT /api/order/:id
router.put("/:id", validateParams(idSchema), validateBody(updateOrderSchema), orderController.editOrder);

// DELETE /api/order/:id
router.delete("/:id", validateParams(idSchema), orderController.removeOrder);

export default router;
