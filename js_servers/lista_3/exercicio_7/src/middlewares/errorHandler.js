export function errorHandler(err, req, res, next) {
  console.error(err); // log interno para debug

  const status = err.status || 500;
  const message = err.message || "Erro interno do servidor";

  res.status(status).json({ message });
}
