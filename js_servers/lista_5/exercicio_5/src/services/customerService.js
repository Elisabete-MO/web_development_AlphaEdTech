let customers = [];

export function getAllCustomers() {
  return customers;
}

export function findCustomerById(id) {
  return customers.find(p => p.id === id);
}

export function addCustomer(customer) {
  if (customers.some(p => p.id === customer.id || p.email === customer.email)) {
    const error = new Error("ID ou email já constam na base de dados");
    error.status = 409;
    throw error;
  }

  customers.push(customer);
  return customer;
}

export function updateCustomer(id, data) {
  const index = customers.findIndex(p => p.id === id);

  if (index === -1) {
    return null;
  }

  customers[index] = {
    id,
    name: data.name ?? customers[index].name,
    email: data.email ?? customers[index].email
  };

  return customers[index];
}

export function deleteCustomer(id) {
  const index = customers.findIndex(p => p.id === id);

  if (index === -1) {
    return null;
  }

  return customers.splice(index, 1);
}
