let customers = [];

export function getAllcustomers() {
  return customers;
}

export function findcustomerById(id) {
  return customers.find(p => p.id === id);
}

export function addcustomer(customer) {
  if (customers.some(p => p.id === customer.id || p.email === customer.email)) {
    throw new Error("ID já existe ou email já cadastrado");
  }

  customers.push(customer);
  return customer;
}

export function updatecustomer(id, data) {
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

export function deletecustomer(id) {
  const index = customers.findIndex(p => p.id === id);

  if (index === -1) {
    return null;
  }

  return customers.splice(index, 1);
}
