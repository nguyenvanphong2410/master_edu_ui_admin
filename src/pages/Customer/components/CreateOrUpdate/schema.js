import {GENDER_USER, MAX_STRING_SIZE, STATUS_ACTIVE } from '@/utils/constants';
import { VALIDATE_PHONE_REGEX_RULE } from '@/utils/helper';
import Joi from 'joi';

export const createCustomerSchema = Joi.object({
  name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Tên tài liệu'),
  email: Joi.string().trim().max(MAX_STRING_SIZE).email({ tlds: false }).required().label('Email'),
  password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label("Mật khẩu"),
  avatar: Joi.any(),
  gender: Joi.string()
    .valid(...Object.values(GENDER_USER))
    .label('Giới tính')
    .messages({ 'any.only': 'Giới tính không hợp lệ.' }),
  phone: Joi.string().trim().pattern(VALIDATE_PHONE_REGEX_RULE).allow(null, '').label('Số điện thoại'),
  address: Joi.string().allow(null, '').label('Địa chỉ'),
  status: Joi.string()
    .valid(...Object.values(STATUS_ACTIVE))
    .label('Trạng thái')
    .messages({ 'any.only': 'Trạng thái không hợp lệ.' }),
});

export const updateCustomerSchema = Joi.object({
  name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Tên tài liệu'),
  email: Joi.string().trim().max(MAX_STRING_SIZE).email({ tlds: false }).required().label('Email'),
  avatar: Joi.any(),
  gender: Joi.string()
    .valid(...Object.values(GENDER_USER))
    .label('Giới tính')
    .messages({ 'any.only': 'Giới tính không hợp lệ.' }),
  phone: Joi.string().trim().pattern(VALIDATE_PHONE_REGEX_RULE).allow(null, '').label('Số điện thoại'),
  address: Joi.string().allow(null, '').label('Địa chỉ'),
  status: Joi.string()
    .valid(...Object.values(STATUS_ACTIVE))
    .label('Trạng thái')
    .messages({ 'any.only': 'Trạng thái không hợp lệ.' }),
});
