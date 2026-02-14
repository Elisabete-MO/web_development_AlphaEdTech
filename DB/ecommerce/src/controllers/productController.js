import { productRepository } from "../repositories/productRepository.js";

export const productController = {
  getAllProducts: (req, res) => {
    productRepository.getAllProducts()
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  getProductById: (req, res) => {
    productRepository.getProductById(req.params.id)
      .then((product) => {
        res.status(200).json(product);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  createProduct: (req, res) => {
    productRepository.createProduct(req.body)
      .then((product) => {
        res.status(201).json(product);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  updateProduct: (req, res) => {
    productRepository.updateProduct(req.params.id, req.body)
      .then((product) => {
        res.status(200).json(product);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  deleteProduct: (req, res) => {
    productRepository.deleteProduct(req.params.id)
      .then((product) => {
        res.status(200).json(`deleted product: ${product.name}`);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },
};


