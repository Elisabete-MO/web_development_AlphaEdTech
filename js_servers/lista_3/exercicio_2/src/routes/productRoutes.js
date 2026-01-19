import { Router } from "express";
import { productController } from "../controllers/index.js";
import { validateBody } from "../middlewares/validate.js";
import { productSchema } from "../validators/productSchema.js";

const router = Router();

// GET /api/product
router.get("/", productController.listProducts);

// GET /api/product/:id
router.get("/:id", productController.getProductById);

// POST /api/product
router.post("/", validateBody(productSchema), productController.createProduct);

// PUT /api/product/:id
router.put("/:id", validateBody(productSchema), productController.editProduct);

// DELETE /api/product/:id
router.delete("/:id", productController.removeProduct);

export default router;
