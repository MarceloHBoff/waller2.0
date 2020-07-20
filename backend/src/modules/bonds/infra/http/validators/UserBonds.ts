import { celebrate, Segments, Joi } from 'celebrate';

export const UserBondsPost = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    buy_price: Joi.number().required(),
    now_price: Joi.number().required(),
    due_date: Joi.date().required(),
  },
});
