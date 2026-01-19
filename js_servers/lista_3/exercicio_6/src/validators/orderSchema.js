import Joi from "joi";

export const orderSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  customerId: Joi.number().integer().positive().required(),
  items: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().positive().required(),
        quantity: Joi.number().integer().positive().required()
      })
    )
    .min(1)
    .required()
});
