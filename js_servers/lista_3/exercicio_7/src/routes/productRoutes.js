import { Router } from "express";
import { productController } from "../controllers/index.js";
import { validateBody } from "../middlewares/validate.js";
import { productSchema, updateProductSchema } from "../validators/productSchema.js";
import { validateParams } from "../validators/validateParams.js";
import { idSchema } from "../validators/idSchema.js";

const router = Router();

// GET /api/product
router.get("/", productController.listProducts);

// GET /api/product/:id
router.get("/:id", validateParams(idSchema), productController.getProductById);

// POST /api/product
router.post("/", validateBody(productSchema), productController.createProduct);

// PUT /api/product/:id
router.put("/:id", validateParams(idSchema), validateBody(updateProductSchema), productController.editProduct);

// DELETE /api/product/:id
router.delete("/:id", validateParams(idSchema), productController.removeProduct);

export default router;
