export function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // mostra todos os erros, não só o primeiro
      stripUnknown: true // remove campos extras que não estão no schema
    });

    if (error) {
      return res.status(400).json({
        message: error.details.map(d => d.message).join(", ")
      });
    }

    req.body = value; // substitui pelo corpo já validado
    next();
  };
}
