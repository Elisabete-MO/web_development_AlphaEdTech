import db from '../db/productDB.js';

export async function getAllProducts() {
  try {
    return await db.values().all();
  } catch (error) {
    throw error;
  }
}

export async function findProductById(id) {
  try {
    const product = await db.get(id);
    return product;
  } catch (error) {
    throw error;
  }
}

export async function addProduct(product) {
  try {
    const existingProduct = await db.get(product.id);
    if (existingProduct) {
      const error = new Error("ID já existe");
      error.status = 409;
      throw error;
    }
    return await db.put(product.id, product);
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(id, data) {
  try {
    const product = await db.get(id);

    const updatedProduct = {
      id,
      name: data.name ?? product.name,
      value: data.value ?? product.value
    };

    await db.put(id, updatedProduct);
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const product = await db.get(id);
    await db.del(id);
    return product;
  } catch (error) {
    throw error;
  }
}


