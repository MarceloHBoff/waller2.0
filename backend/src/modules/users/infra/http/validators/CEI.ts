import { celebrate, Segments, Joi } from 'celebrate';

export const CEICreate = celebrate({
  [Segments.BODY]: {
    cpf: Joi.string().required(),
    password: Joi.string().required(),
  },
});
