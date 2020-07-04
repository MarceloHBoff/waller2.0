import { celebrate, Segments, Joi } from 'celebrate';

export const UserActivesPost = celebrate({
  [Segments.BODY]: {
    code: Joi.string().required(),
    quantity: Joi.number().required(),
    buyPrice: Joi.number().required(),
    buyDate: Joi.date(),
  },
});
