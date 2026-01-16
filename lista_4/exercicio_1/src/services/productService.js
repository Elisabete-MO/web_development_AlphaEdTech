let products = [];

export function getAllProducts() {
  return products;
}

export function findProductById(id) {
  return products.find(p => p.id === id);
}

export function addProduct(product) {
if (products.some(p => p.id === product.id)) {
  const error = new Error("ID já existe");
  error.status = 409;
  throw error;
}

  products.push(product);
  return product;
}

export function updateProduct(id, data) {
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return null;
  }

  products[index] = {
    id,
    name: data.name ?? products[index].name,
    value: data.value ?? products[index].value
  };

  return products[index];
}

export function deleteProduct(id) {
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return null;
  }

  return products.splice(index, 1);
}
