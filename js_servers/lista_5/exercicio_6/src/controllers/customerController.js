import { customerService } from "../services/index.js";
import { handleNotFound } from "../utils/handleNotFound.js";

const ITEM = "Cliente";

export async function listCustomers(req, res, next) {
  try {
    const customers = await customerService.getAllCustomers();

    res.status(200).json(customers);
  } catch (error) {
    next(error); // envia para o middleware global de erros
  }
}

export async function getCustomerById(req, res, next) {
  try {
    const { id } = req.validatedParams;

    const customer = handleNotFound(await customerService.findCustomerById(id), ITEM);
    res.status(200).json(customer);
  } catch (error) {
    next(error); // envia para o middleware de erro
  }
}

export async function createCustomer(req, res, next) {
  try {
    const newCustomer = await customerService.addCustomer(req.body);

    if (!newCustomer) {
      const error = new Error("Não foi possível criar o cliente");
      error.status = 500;
      throw error;
    }

    res.status(201).json({ message: "Cliente criado com sucesso", customer: newCustomer });
  } catch (error) {
    next(error);
  }
}

export async function editCustomer(req, res, next) {
  try {
    const { id } = req.validatedParams;
    const updated = handleNotFound(await customerService.updateCustomer(id, req.body), ITEM);
    res.status(200).json({ message: "Atualização concluída com sucesso", customer: updated });
  } catch (error) {
    next(error); // envia para o middleware de erro
  }
}

export async function removeCustomer(req, res, next) {
  try {
    const { id } = req.validatedParams;
    const deleted = handleNotFound(await customerService.deleteCustomer(id), ITEM);
    res.status(200).json({ message: `${ITEM} removido`, customer: deleted });
  } catch (error) {
    next(error);
  }
}
