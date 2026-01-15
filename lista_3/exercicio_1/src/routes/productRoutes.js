import { Router } from "express";
import { productController } from "../controllers/index.js";
import { validateProductBody } from "../validators/productValidator.js";

const router = Router();

// GET /api/product
router.get("/", productController.listProducts);

// GET /api/product/:id
router.get("/:id", productController.getProductById);

// POST /api/product
router.post("/", validateProductBody, productController.createProduct);

// PUT /api/product/:id
router.put("/:id", validateProductBody, productController.editProduct);

// DELETE /api/product/:id
router.delete("/:id", productController.removeProduct);

export default router;
