import { celebrate, Segments, Joi } from 'celebrate';

export const UserActivesPost = celebrate({
  [Segments.BODY]: {
    code: Joi.string().required(),
    type: Joi.string().valid('C', 'V').required(),
    quantity: Joi.number().required(),
    buy_price: Joi.number().required(),
    buy_date: Joi.date(),
  },
});
