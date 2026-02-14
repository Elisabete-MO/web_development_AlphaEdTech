import { orderRepository } from "../repositories/orderRepository.js";

export const orderController = {
  getAllOrders: (req, res) => {
    orderRepository.getAllOrders()
      .then((orders) => {
        res.status(200).json(orders);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  getOrderById: (req, res) => {
    orderRepository.getOrderById(req.params.id)
      .then((order) => {
        res.status(200).json(order);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  createOrder: (req, res) => {
    orderRepository.createOrder(req.body)
      .then((order) => {
        res.status(201).json(order);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  updateOrder: (req, res) => {
    orderRepository.updateOrder(req.params.id, req.body)
      .then((order) => {
        res.status(200).json(order);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  deleteOrder: (req, res) => {
    orderRepository.deleteOrder(req.params.id)
      .then((order) => {
        res.status(200).json(`deleted order: ${order.id} - ${order.status} - ${order.created_at}`);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },
};


