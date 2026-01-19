import express from "express";
import {
  getAllOrders,
  findOrderById,
  addOrder,
  updateOrder,
  deleteOrder
} from "../services/order_service.js";

import { validateOrderBody } from "../validators/order_validator.js";

const router = express.Router();

// GET /api/order
router.get("/", (req, res) => {
  res.json(getAllOrders());
});

// GET /api/order/:id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const order = findOrderById(id);
  if (!order) {
    return res.status(404).json({ message: "Pedido não encontrado" });
  }

  res.json(order);
});

// POST /api/order
router.post("/", (req, res) => {
  const error = validateOrderBody(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const newOrder = addOrder(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/order/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const updated = updateOrder(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Pedido não encontrado" });
  }

  res.json(updated);
});

// DELETE /api/order/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const deleted = deleteOrder(id);
  if (!deleted) {
    return res.status(404).json({ message: "Pedido não encontrado" });
  }

  res.json({ message: "Pedido removido", order: deleted });
});

export default router;
