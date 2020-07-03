import { celebrate, Segments, Joi } from 'celebrate';

export const ActivesPost = celebrate({
  [Segments.BODY]: {
    code: Joi.string().required(),
  },
});
