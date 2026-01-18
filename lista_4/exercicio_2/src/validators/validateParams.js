import Joi from 'joi';

export function validateParams(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params);
    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 400;
      return next(err);
    }
    req.validatedParams = value;
    next();
  };
}
