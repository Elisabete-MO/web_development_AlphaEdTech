import { Router } from "express";
import { customerController } from "../controllers/index.js";
import { validateBody } from "../middlewares/validate.js";
import { customerSchema } from "../validators/customerSchema.js";

const router = Router();

// GET /api/customer
router.get("/", customerController.listcustomers);

// GET /api/customer/:id
router.get("/:id", customerController.getcustomerById);

// POST /api/customer
router.post("/", validateBody(customerSchema), customerController.createcustomer);

// PUT /api/customer/:id
router.put("/:id", validateBody(customerSchema), customerController.editcustomer);

// DELETE /api/customer/:id
router.delete("/:id", customerController.removecustomer);

export default router;
