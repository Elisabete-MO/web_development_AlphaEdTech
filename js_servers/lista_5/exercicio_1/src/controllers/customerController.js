import { customerService } from "../services/index.js";
import { handleNotFound } from "../utils/handleNotFound.js";

const ITEM = "Cliente";

export function listCustomers(req, res, next) {
  try {
    const customers = customerService.getAllCustomers();

    res.status(200).json(customers);
  } catch (error) {
    next(error); // envia para o middleware global de erros
  }
}

export function getCustomerById(req, res, next) {
  try {
    const { id } = req.validatedParams;

    const customer = handleNotFound(customerService.findCustomerById(id), ITEM);
    res.status(200).json(customer);
  } catch (error) {
    next(error); // envia para o middleware de erro
  }
}

export function createCustomer(req, res, next) {
  try {
    const newCustomer = customerService.addCustomer(req.body);


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

export function editCustomer(req, res, next) {
  try {
    const { id } = req.validatedParams;
    const updated = handleNotFound(customerService.updateCustomer(id, req.body), ITEM);

    res.status(200).json({ message: "Atualização concluída com sucesso", customer: updated });
  } catch (error) {
    next(error); // envia para o middleware de erro
  }
}

export function removeCustomer(req, res, next) {
  try {
    const { id } = req.validatedParams;
    const deleted = handleNotFound(customerService.deleteCustomer(id), ITEM);

    res.status(200).json({ message: `${ITEM} removido`, customer: deleted });
  } catch (error) {
    next(error);
  }
}
