import Joi from "joi";

export const orderSearchSchema = Joi.object({
  product_id: Joi.number().integer().min(1),
  customer_id: Joi.number().integer().min(1)
})
  .or("product_id", "customer_id") // 👉 obriga que UM dos dois exista
  .messages({
    "object.missing": "Informe product_id ou customer_id como parâmetro",
    "number.base": "Os parâmetros devem ser números inteiros",
    "number.integer": "Os parâmetros devem ser números inteiros",
    "number.min": "Os parâmetros devem ser maiores que zero"
  });
