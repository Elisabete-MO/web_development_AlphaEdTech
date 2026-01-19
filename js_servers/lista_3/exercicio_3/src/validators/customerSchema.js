import Joi from "joi";

export const customerSchema = Joi.object({
  id: Joi.number().integer().positive().required(),

  name: Joi.string()
    .min(3)
    .required(),

  email: Joi.string()
    .email({ tlds: { allow: false } }) // aceita qualquer domínio (.com, .io, etc.)
    .required()
});
