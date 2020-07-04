import { celebrate, Segments, Joi } from 'celebrate';

export const UserBondsPost = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    buyPrice: Joi.number().required(),
    nowPrice: Joi.number().required(),
    dueDate: Joi.date().required(),
  },
});
