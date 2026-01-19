export function validateOrderBody(body) {
  const { id, items } = body;

  if (id === undefined || items === undefined) {
    return "id e items são obrigatórios";
  }

  if (typeof id !== "number" || !Number.isInteger(id)) {
    return "id deve ser um número inteiro";
  }

  if (!Array.isArray(items)) {
    return "items deve ser um array";
  }

  if (items.length === 0) {
    return "items não pode ser um array vazio";
  }

  for (const item of items) {
    if (item.id === undefined || item.quantity === undefined) {
      return "Cada item deve ter id e quantity";
    }

    if (typeof item.id !== "number" || !Number.isInteger(item.id)) {
      return "item.id deve ser um número inteiro";
    }

    if (typeof item.quantity !== "number" || !Number.isInteger(item.quantity) || item.quantity <= 0) {
      return "item.quantity deve ser um número inteiro positivo";
    }
  }

  return null;
}
