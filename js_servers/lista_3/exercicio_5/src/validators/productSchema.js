import Joi from "joi";

export const productSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  name: Joi.string().min(3).required(),
  value: Joi.number().positive().precision(2).required()
});
