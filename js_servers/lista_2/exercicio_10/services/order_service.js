let orders = [];

export function getAllOrders() {
  return orders;
}

export function findOrderById(id) {
  return orders.find(o => o.id === id);
}

export function addOrder(order) {
  if (orders.some(o => o.id === order.id)) {
    throw new Error("ID do pedido já existe");
  }

  orders.push(order);
  return order;
}

export function updateOrder(id, data) {
  const index = orders.findIndex(o => o.id === id);

  if (index === -1) {
    return null;
  }

  orders[index] = {
    id,
    items: data.items ?? orders[index].items
  };

  return orders[index];
}

export function deleteOrder(id) {
  const index = orders.findIndex(o => o.id === id);

  if (index === -1) {
    return null;
  }

  return orders.splice(index, 1);
}
