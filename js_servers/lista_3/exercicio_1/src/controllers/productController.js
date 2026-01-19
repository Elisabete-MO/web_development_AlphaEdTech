import { productService } from "../services/index.js";

export function listProducts(req, res) {
  res.json(productService.getAllProducts());
}

export function getProductById(req, res) {
  const id = parseInt(req.params.id);

  const product = productService.findProductById(id);
  if (!product) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  res.json(product);
}

export function createProduct(req, res) {
  try {
    const newProduct = productService.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export function editProduct(req, res) {
  const id = parseInt(req.params.id);

  const updated = productService.updateProduct(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  res.json(updated);
}

export function removeProduct(req, res) {
  const id = parseInt(req.params.id);

  const deleted = productService.deleteProduct(id);
  if (!deleted) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  res.json({ message: "Produto removido", product: deleted });
}
