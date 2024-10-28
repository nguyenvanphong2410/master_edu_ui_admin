import Joi from 'joi';

export const feedbackSchema = Joi.object({
  _id: Joi.any(),
  cover: Joi.object({
    url: Joi.string().required().label('Ảnh bìa'),
    data: Joi.any(),
  })
    .required()
    .label('Ảnh bìa'),
  avatar: Joi.object({
    url: Joi.string().required().label('Ảnh đại diện'),
    data: Joi.any(),
  })
    .required()
    .label('Ảnh đại diện'),
  name: Joi.string().trim().max(60).required().label('Tên học viên'),
  content: Joi.string().required().label('Nhận xét'),
});
