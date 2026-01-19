export function validatecustomerBody(req, res, next) {
  const { id, name, email } = req.body;

  if (id === undefined || name === undefined || email === undefined) {
    return res.status(400).json({ message: "id, name e email são obrigatórios" });
  }

  if (typeof id !== "number" || !Number.isInteger(id)) {
    return res.status(400).json({ message: "id deve ser um número inteiro" });
  }

  if (typeof name !== "string") {
    return res.status(400).json({ message: "name deve ser uma string" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email)
  if (!isValidEmail) {
    return res.status(400).json({ message: "email inválido" });
  }

  next(); // segue para o controller
}
