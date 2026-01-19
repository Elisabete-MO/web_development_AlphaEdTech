import express from "express";
import {
  getAllProducts,
  findProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from "../services/product_service.js";

import { validateProductBody } from "../validators/product_validator.js";

const router = express.Router();

// GET /api/product
router.get("/", (req, res) => {
  res.json(getAllProducts());
});

// GET /api/product/:id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const product = findProductById(id);
  if (!product) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  res.json(product);
});

// POST /api/product
router.post("/", (req, res) => {
  const error = validateProductBody(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const newProduct = addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/product/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const updated = updateProduct(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  res.json(updated);
});

// DELETE /api/product/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const deleted = deleteProduct(id);
  if (!deleted) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  res.json({ message: "Produto removido", product: deleted });
});

export default router;
