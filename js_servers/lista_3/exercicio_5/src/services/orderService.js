let orders = [];

export function getAllOrders() {
  return orders;
}

export function findOrderById(id) {
  return orders.find(o => o.id === id);
}

export function searchOrders({ productId, customerId }) {
  return orders.filter(order => {
    const matchesProduct = productId
      ? order.items.some(item => item.id === productId)
      : true;

    const matchesCustomer = customerId
      ? order.customerId === customerId
      : true;

    return matchesProduct && matchesCustomer;
  });
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
    customerId: data.customerId ?? orders[index].customerId,
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
