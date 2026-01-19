export function errorHandler(err, req, res, next) {
  console.error({
    timestamp: new Date().toISOString(),
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    status: err.status || 500
  });

  const status = err.status || 500;
  const message = err.message || "Erro interno do servidor";

  res.status(status).json({ message });
}
