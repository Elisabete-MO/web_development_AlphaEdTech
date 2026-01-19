import { customerService } from "../services/index.js";

export function listcustomers(req, res) {
  res.json(customerService.getAllcustomers());
}

export function getcustomerById(req, res) {
  const id = parseInt(req.params.id);

  const customer = customerService.findcustomerById(id);
  if (!customer) {
    return res.status(404).json({ message: "Cliente não encontrado" });
  }

  res.json(customer);
}

export function createcustomer(req, res) {
  try {
    const newcustomer = customerService.addcustomer(req.body);
    res.status(201).json(newcustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export function editcustomer(req, res) {
  const id = parseInt(req.params.id);

  const updated = customerService.updatecustomer(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Cliente não encontrado" });
  }

  res.json(updated);
}

export function removecustomer(req, res) {
  const id = parseInt(req.params.id);

  const deleted = customerService.deletecustomer(id);
  if (!deleted) {
    return res.status(404).json({ message: "Cliente não encontrado" });
  }

  res.json({ message: "Cliente removido", customer: deleted });
}
