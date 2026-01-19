import db from '../db/orderDB.js';

export async function getAllOrders() {
  try {
    return await db.values().all();
  } catch (error) {
    throw error;
  }
}

export async function findOrderById(id) {
  try {
    const order = await db.get(id);
    return order;
  } catch (error) {
    throw error;
  }
}

export async function searchOrders({ productId, customerId }) {
  const orders = await db.values().all();
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


export async function addOrder(order) {
  const orders = await db.values().all();
  if (orders.some(p => p.id === order.id)) {
    const error = new Error("ID já existe");
    error.status = 409;
    throw error;
  }

  return await db.put(order.id, order);
}

export async function updateOrder(id, data) {
  const orders = await db.values().all();
  const index = orders.findIndex(o => o.id === id);

  if (index === -1) {
    return null;
  }

  orders[index] = {
    id,
    customerId: data.customerId ?? orders[index].customerId,
    items: data.items ?? orders[index].items
  };

  return await db.put(id, orders[index]);
}

export async function deleteOrder(id) {
  const orders = await db.values().all();
  const index = orders.findIndex(o => o.id === id);

  if (index === -1) {
    return null;
  }

  return await db.del(id);
}
