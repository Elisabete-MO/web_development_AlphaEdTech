import { Router } from "express";
import { customerController } from "../controllers/index.js";
import { validatecustomerBody } from "../validators/customerValidator.js";

const router = Router();

// GET /api/customer
router.get("/", customerController.listcustomers);

// GET /api/customer/:id
router.get("/:id", customerController.getcustomerById);

// POST /api/customer
router.post("/", validatecustomerBody, customerController.createcustomer);

// PUT /api/customer/:id
router.put("/:id", validatecustomerBody, customerController.editcustomer);

// DELETE /api/customer/:id
router.delete("/:id", customerController.removecustomer);

export default router;
