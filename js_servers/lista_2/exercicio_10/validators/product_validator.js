export function validateProductBody(body) {
  const { id, name, value } = body;

  if (id === undefined || name === undefined || value === undefined) {
    return "id, name e value são obrigatórios";
  }

  if (typeof id !== "number" || !Number.isInteger(id)) {
    return "id deve ser um número inteiro";
  }

  if (typeof name !== "string") {
    return "name deve ser uma string";
  }

  if (typeof value !== "number") {
    return "value deve ser numérico";
  }

  return null; // sem erro
}
