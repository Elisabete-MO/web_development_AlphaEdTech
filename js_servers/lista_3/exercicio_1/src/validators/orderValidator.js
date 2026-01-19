export function validateOrderBody(req, res, next) {
  const { id, items } = req.body;

  if (id === undefined || items === undefined) {
    return res.status(400).json({ message: "id e items são obrigatórios" });
  }

  if (typeof id !== "number" || !Number.isInteger(id)) {
    return res.status(400).json({ message: "id deve ser um número inteiro" });
  }

  if (!Array.isArray(items)) {
    return res.status(400).json({ message: "items deve ser um array" });
  }

  if (items.length === 0) {
    return res.status(400).json({ message: "items não pode ser um array vazio" });
  }

  for (const item of items) {
    if (item.id === undefined || item.quantity === undefined) {
      return res.status(400).json({ message: "Cada item deve ter id e quantity" });
    }

    if (typeof item.id !== "number" || !Number.isInteger(item.id)) {
      return res.status(400).json({ message: "item.id deve ser um número inteiro" });
    }

    if (
      typeof item.quantity !== "number" ||
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0
    ) {
      return res.status(400).json({ message: "item.quantity deve ser um número inteiro positivo" });
    }
  }

  next(); // 🔥 MUITO IMPORTANTE
}
