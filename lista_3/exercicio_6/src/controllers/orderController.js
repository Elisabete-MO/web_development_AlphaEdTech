import { orderService } from "../services/index.js";

export function listOrders(req, res) {
  res.json(orderService.getAllOrders());
}

export function getOrderById(req, res) {
  const id = parseInt(req.params.id);

  const order = orderService.findOrderById(id);
  if (!order) {
    return res.status(404).json({ message: "Pedido não encontrado" });
  }

  res.json(order);
}

export function searchOrders(req, res) {
  const { product_id, customer_id } = req.validatedQuery;

  const orders = orderService.searchOrders({
    productId: product_id,
    customerId: customer_id
  });

  res.json(orders);
}


export function createOrder(req, res) {
  try {
    const newOrder = orderService.addOrder(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export function editOrder(req, res) {
  const id = parseInt(req.params.id);

  const updated = orderService.updateOrder(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Pedido não encontrado" });
  }

  res.json(updated);
}

export function removeOrder(req, res) {
  const id = parseInt(req.params.id);

  const deleted = orderService.deleteOrder(id);
  if (!deleted) {
    return res.status(404).json({ message: "Pedido não encontrado" });
  }

  res.json({ message: "Pedido removido", order: deleted });
}
