import { Router } from "express";
import { customerController } from "../controllers/index.js";
import { validateBody } from "../middlewares/validate.js";
import { customerSchema, updateCustomerSchema } from "../validators/customerSchema.js";
import { validateParams } from "../validators/validateParams.js";
import { idSchema } from "../validators/idSchema.js";

const router = Router();

// GET /api/customer
router.get("/", customerController.listCustomers);

// GET /api/customer/:id
router.get("/:id", validateParams(idSchema), customerController.getCustomerById);

// POST /api/customer
router.post("/", validateBody(customerSchema), customerController.createCustomer);

// PUT /api/customer/:id
router.put("/:id", validateParams(idSchema), validateBody(updateCustomerSchema), customerController.editCustomer);

// DELETE /api/customer/:id
router.delete("/:id", validateParams(idSchema), customerController.removeCustomer);
export default router;
