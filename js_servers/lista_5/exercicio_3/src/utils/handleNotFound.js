export function handleNotFound(resource, item) {
  if (!resource) {
    const error = new Error(`${item} não encontrado`);
    error.status = 404;
    throw error;
  }
  return resource;
}