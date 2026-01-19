import { orderService } from "../services/index.js";
import { handleNotFound } from "../utils/handleNotFound.js";

const ITEM = "Pedido(s)";

export async function listOrders(req, res, next) {
  try {
    const orders = await orderService.getAllOrders();

    res.status(200).json(orders);
  } catch (error) {
    next(error); // envia para o middleware global de erros
  }
}

export async function getOrderById(req, res, next) {
  try {
    const { id } = req.validatedParams;

    const order = handleNotFound(await orderService.findOrderById(id), ITEM);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

export async function searchOrders(req, res, next) {
  try {
    const { product_id, customer_id } = req.validatedQuery;

    const orders = await orderService.searchOrders({
      productId: product_id,
      customerId: customer_id
    });

    handleNotFound(orders.length ? orders : null, ITEM);

    res.status(200).json(orders);
  }
  catch (error) {
    next(error);
  }
}


export async function createOrder(req, res, next) {
  try {
    const newOrder = await orderService.addOrder(req.body);

    if (!newOrder) {
      const error = new Error("Não foi possível criar o pedido");
      error.status = 500;
      throw error;
    }

    res.status(201).json({ message: "Pedido criado com sucesso", order: newOrder });
  } catch (error) {
    next(error);
  }
}

export async function editOrder(req, res) {
  try {
    const { id } = req.validatedParams;

    const updated = handleNotFound(await orderService.updateOrder(id, req.body), ITEM);

    res.status(200).json({ message: "Atualização concluída com sucesso", order: updated });
  } catch (error) {
    next(error);
  }
}

export async function removeOrder(req, res) {
  try {
    const { id } = req.validatedParams;

    const deleted = handleNotFound(await orderService.deleteOrder(id), ITEM);

    res.status(200).json({ message: `${ITEM} removido`, order: deleted });
  } catch (error) {
    next(error);
  }
}
