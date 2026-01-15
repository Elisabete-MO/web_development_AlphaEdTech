export function validateProductBody(req, res, next) {
  const { id, name, value } = req.body;

  if (id === undefined || name === undefined || value === undefined) {
    return res.status(400).json({ message: "id, name e value são obrigatórios" });
  }

  if (typeof id !== "number" || !Number.isInteger(id)) {
    return res.status(400).json({ message: "id deve ser um número inteiro" });
  }

  if (typeof name !== "string") {
    return res.status(400).json({ message: "name deve ser uma string" });
  }

  if (typeof value !== "number") {
    return res.status(400).json({ message: "value deve ser numérico" });
  }

  next(); // segue para o controller
}
