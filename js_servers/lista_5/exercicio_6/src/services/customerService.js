import db from '../db/customerDB.js';

export async function getAllCustomers() {
  try {
    return await db.values().all();
  } catch (error) {
    throw error;
  }
}

export async function findCustomerById(id) {
  try {
    const customer = await db.get(id);
    return customer;
  } catch (error) {
    throw error;
  }
}

export async function addCustomer(customer) {
  const customers = await db.values().all();
  if (customers.some(p => p.id === customer.id || p.email === customer.email)) {
    const error = new Error("ID ou email já constam na base de dados");
    error.status = 409;
    throw error;
  }

  await db.put(customer.id, customer);
  return customer;
}

export async function updateCustomer(id, data) {
  const customers = await db.values().all();
  const index = customers.findIndex(p => p.id === id);

  if (index === -1) {
    return null;
  }

  customers[index] = {
    id,
    name: data.name ?? customers[index].name,
    email: data.email ?? customers[index].email
  };

  return await db.put(id, customers[index]);
}

export async function deleteCustomer(id) {
  const customers = await db.values().all();
  const index = customers.findIndex(p => p.id === id);

  if (index === -1) {
    return null;
  }

  return await db.del(id);

}
