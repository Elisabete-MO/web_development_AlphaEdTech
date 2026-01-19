import { productService } from "../services/index.js";
import { handleNotFound } from "../utils/handleNotFound.js";

const ITEM = "Produto";

export async function listProducts(req, res, next) {
  try {
    const products = await productService.getAllProducts();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

export async function getProductById(req, res, next) {
  try {
    const { id } = req.validatedParams;

    const product = handleNotFound(await productService.findProductById(id), ITEM);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    const newProduct = await productService.addProduct(req.body);

    if (newProduct === null) {
      const error = new Error("Não foi possível criar o produto");
      error.status = 500;
      throw error;
    }

    res.status(201).json({
      message: "Produto criado com sucesso",
      product: newProduct
    });

  } catch (error) {
    next(error);
  }
}

export async function editProduct(req, res, next) {
  try {
    const { id } = req.validatedParams;
    const updated = handleNotFound(await productService.updateProduct(id, req.body), ITEM);

    res.status(200).json({ message: "Atualização concluída com sucesso", product: updated });
  } catch (error) {
    next(error);
  }
}

export async function removeProduct(req, res, next) {
  try {
    const { id } = req.validatedParams;
    const deleted = handleNotFound(await productService.deleteProduct(id), ITEM);

    res.status(200).json({ message: `${ITEM} removido`, product: deleted });
  } catch (error) {
    next(error);
  }
}
